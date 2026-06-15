const express = require("express");
const { GetCommand, QueryCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { ddb } = require("../../config/dynamo");
const { getAnonId, pickLang } = require("../../utils/quizHelpers");
const { INTERVIEW_QUESTION_COUNT } = require("../../utils/quizConstants");
const logger = require("../../utils/logger");
const { mapDynamoError } = require("../../utils/mapDynamoError");

const router = express.Router();
const USERS_TABLE = process.env.QUIZ_USER_STATS_TABLE;
const QUESTIONS_TABLE = process.env.QUIZ_QUESTIONS_TABLE;

async function fetchQuestionPool(category, difficulty) {
  const qOut = await ddb.send(
    new QueryCommand({
      TableName: QUESTIONS_TABLE,
      IndexName: "categoryDifficultyIndex",
      KeyConditionExpression: "#cat = :cat AND #diff = :diff",
      FilterExpression: "#active = :trueVal",
      ExpressionAttributeNames: {
        "#cat": "category",
        "#diff": "difficulty",
        "#active": "isActive",
      },
      ExpressionAttributeValues: {
        ":cat": category,
        ":diff": difficulty,
        ":trueVal": true,
      },
      ProjectionExpression: "questionId, category, difficulty, questionText, answers, explanation, isActive",
    })
  );
  return qOut.Items || [];
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatQuestion(item, lang) {
  const questionText = pickLang(item.questionText, lang);
  const answers = pickLang(item.answers, lang);
  if (!questionText || !Array.isArray(answers) || answers.length !== 4) {
    return null;
  }
  return {
    questionId: item.questionId,
    category: item.category,
    difficulty: item.difficulty,
    questionText,
    answers,
    hasExplanation: !!pickLang(item.explanation, lang),
    questionTextI18n: item.questionText,
    answersI18n: item.answers,
    explanationI18n: item.explanation,
  };
}

router.get("/next", async (req, res) => {
  try {
    if (!process.env.AWS_REGION_DB || !USERS_TABLE || !QUESTIONS_TABLE) {
      return res.status(500).json({ ok: false, error: "server_misconfigured" });
    }

    const anonId = getAnonId(req);
    if (!anonId) return res.status(400).json({ ok: false, error: "missing_x_anon_id" });

    const lang = (req.query.lang || "en").toString();
    if (!["en", "he"].includes(lang)) {
      return res.status(400).json({ ok: false, error: "invalid_lang" });
    }

    const userOut = await ddb.send(
      new GetCommand({
        TableName: USERS_TABLE,
        Key: { anonId },
        ProjectionExpression: "sessionCurrent",
      })
    );

    const session = userOut.Item?.sessionCurrent;
    if (!session) return res.status(400).json({ ok: false, error: "no_active_session" });

    const asked = Array.isArray(session.askedQuestionIds) ? [...session.askedQuestionIds] : [];
    const wrongQueue = Array.isArray(session.wrongQueue) ? [...session.wrongQueue] : [];
    let reshuffled = false;
    let chosen = null;
    let nextWrongQueue = wrongQueue;

    if (session.mode === "practice" && wrongQueue.length > 0) {
      const idx = Math.floor(Math.random() * wrongQueue.length);
      const questionId = wrongQueue[idx];
      nextWrongQueue = wrongQueue.filter((_, i) => i !== idx);
      const qOut = await ddb.send(
        new GetCommand({
          TableName: QUESTIONS_TABLE,
          Key: { questionId },
          ProjectionExpression: "questionId, category, difficulty, questionText, answers, explanation, isActive",
        })
      );
      if (qOut.Item && qOut.Item.isActive !== false) {
        chosen = qOut.Item;
      }
    }

    if (!chosen) {
      const pool = await fetchQuestionPool(session.category, session.difficulty);
      let available = pool.filter((it) => !asked.includes(it.questionId));

      if (available.length === 0) {
        if (session.mode === "practice") {
          asked.length = 0;
          available = pool;
          reshuffled = true;
        } else {
          return res.status(404).json({ ok: false, error: "no_more_questions_for_session" });
        }
      }

      if (session.mode === "interview" && asked.length >= INTERVIEW_QUESTION_COUNT) {
        return res.status(400).json({ ok: false, error: "interview_session_complete" });
      }

      chosen = pickRandom(available);
    }

    const formatted = formatQuestion(chosen, lang);
    if (!formatted) {
      return res.status(500).json({ ok: false, error: "invalid_question_data" });
    }

    const updateValues = {
      ":qid": chosen.questionId,
      ":wrongQueue": nextWrongQueue,
    };
    let updateExpression = "SET sessionCurrent.lastQuestionId = :qid, sessionCurrent.wrongQueue = :wrongQueue";

    if (reshuffled) {
      updateExpression += ", sessionCurrent.askedQuestionIds = :asked";
      updateValues[":asked"] = [];
    }

    await ddb.send(
      new UpdateCommand({
        TableName: USERS_TABLE,
        Key: { anonId },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: updateValues,
      })
    );

    const response = {
      ok: true,
      ...formatted,
      questionNumber: session.mode === "interview" ? asked.length + 1 : session.questionIndex,
      totalQuestions: session.mode === "interview" ? INTERVIEW_QUESTION_COUNT : null,
      timePerQuestion: session.mode === "interview" ? session.timePerQuestion : null,
      reshuffled,
    };

    return res.json(response);
  } catch (err) {
    const error = mapDynamoError(err);
    logger.error("quiz_next_question_failed", { message: err.message, error });
    const status = error === "aws_not_configured" ? 503 : 500;
    return res.status(status).json({ ok: false, error });
  }
});

module.exports = router;
