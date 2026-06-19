const express = require("express");
const {
  ScanCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const { GetCostAndUsageCommand } = require("@aws-sdk/client-cost-explorer");
const { ddb } = require("../../config/dynamo");
const { ce } = require("../../config/costExplorer");
const { createAdminToken, verifyAdminToken, requireAdmin, getAdminPassword } = require("../../utils/adminAuth");
const { validateQuestion } = require("../../utils/validateQuestion");
const { VALID_CATEGORIES, VALID_DIFFICULTIES } = require("../../utils/quizConstants");
const logger = require("../../utils/logger");
const { mapDynamoError } = require("../../utils/mapDynamoError");
const { mapCostExplorerError } = require("../../utils/mapCostExplorerError");
const characterChatHandler = require("./characterChat");

const router = express.Router();
const QUESTIONS_TABLE = process.env.QUIZ_QUESTIONS_TABLE;

function matchesFilters(item, { category, difficulty, active, search }) {
  if (category && item.category !== category) return false;
  if (difficulty && item.difficulty !== difficulty) return false;
  if (active === "true" && item.isActive !== true) return false;
  if (active === "false" && item.isActive !== false) return false;
  if (search) {
    const q = search.toLowerCase();
    const en = (item.questionText?.en || "").toLowerCase();
    const he = (item.questionText?.he || "").toLowerCase();
    if (!en.includes(q) && !he.includes(q)) return false;
  }
  return true;
}

async function scanAllQuestions() {
  const items = [];
  let lastKey;
  do {
    const out = await ddb.send(
      new ScanCommand({
        TableName: QUESTIONS_TABLE,
        ExclusiveStartKey: lastKey,
      })
    );
    items.push(...(out.Items || []));
    lastKey = out.LastEvaluatedKey;
  } while (lastKey);
  return items;
}

router.post("/login", (req, res) => {
  const password = getAdminPassword();
  if (!password) {
    return res.status(503).json({ ok: false, error: "admin_not_configured" });
  }

  const { password: submitted } = req.body || {};
  if (!submitted || submitted !== password) {
    return res.status(401).json({ ok: false, error: "invalid_password" });
  }

  const token = createAdminToken();
  return res.json({ ok: true, token });
});

router.post("/logout", requireAdmin, (req, res) => {
  return res.json({ ok: true });
});

router.get("/me", (req, res) => {
  const token = req.header("x-quiz-admin-token");
  if (!verifyAdminToken(token)) {
    return res.status(401).json({ ok: false, authenticated: false });
  }
  return res.json({ ok: true, authenticated: true });
});

router.get("/questions", requireAdmin, async (req, res) => {
  try {
    if (!QUESTIONS_TABLE) {
      return res.status(500).json({ ok: false, error: "server_misconfigured" });
    }

    const { category, difficulty, active, search } = req.query;
    if (category && !VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({ ok: false, error: "invalid_category" });
    }
    if (difficulty && !VALID_DIFFICULTIES.includes(difficulty)) {
      return res.status(400).json({ ok: false, error: "invalid_difficulty" });
    }

    const all = await scanAllQuestions();
    const filtered = all
      .filter((item) => matchesFilters(item, { category, difficulty, active, search }))
      .sort((a, b) => (a.questionId || "").localeCompare(b.questionId || ""));

    return res.json({ ok: true, questions: filtered, total: filtered.length });
  } catch (err) {
    const error = mapDynamoError(err);
    logger.error("quiz_admin_list_failed", { message: err.message, error });
    const status = error === "aws_not_configured" ? 503 : 500;
    return res.status(status).json({ ok: false, error });
  }
});

router.post("/questions", requireAdmin, async (req, res) => {
  try {
    if (!QUESTIONS_TABLE) {
      return res.status(500).json({ ok: false, error: "server_misconfigured" });
    }

    const body = req.body || {};
    const errors = validateQuestion(body);
    if (errors.length) {
      return res.status(400).json({ ok: false, error: "validation_failed", details: errors });
    }

    const existing = await ddb.send(
      new GetCommand({ TableName: QUESTIONS_TABLE, Key: { questionId: body.questionId } })
    );
    if (existing.Item) {
      return res.status(409).json({ ok: false, error: "question_already_exists" });
    }

    const nowIso = new Date().toISOString();
    const item = {
      ...body,
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    await ddb.send(new PutCommand({ TableName: QUESTIONS_TABLE, Item: item }));
    return res.status(201).json({ ok: true, question: item });
  } catch (err) {
    const error = mapDynamoError(err);
    logger.error("quiz_admin_create_failed", { message: err.message, error });
    const status = error === "aws_not_configured" ? 503 : 500;
    return res.status(status).json({ ok: false, error });
  }
});

router.put("/questions/:questionId", requireAdmin, async (req, res) => {
  try {
    if (!QUESTIONS_TABLE) {
      return res.status(500).json({ ok: false, error: "server_misconfigured" });
    }

    const { questionId } = req.params;
    const body = { ...req.body, questionId };
    const errors = validateQuestion(body);
    if (errors.length) {
      return res.status(400).json({ ok: false, error: "validation_failed", details: errors });
    }

    const existing = await ddb.send(
      new GetCommand({ TableName: QUESTIONS_TABLE, Key: { questionId } })
    );
    if (!existing.Item) {
      return res.status(404).json({ ok: false, error: "question_not_found" });
    }

    const item = {
      ...body,
      createdAt: existing.Item.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await ddb.send(new PutCommand({ TableName: QUESTIONS_TABLE, Item: item }));
    return res.json({ ok: true, question: item });
  } catch (err) {
    const error = mapDynamoError(err);
    logger.error("quiz_admin_update_failed", { message: err.message, error });
    const status = error === "aws_not_configured" ? 503 : 500;
    return res.status(status).json({ ok: false, error });
  }
});

router.delete("/questions/:questionId", requireAdmin, async (req, res) => {
  try {
    if (!QUESTIONS_TABLE) {
      return res.status(500).json({ ok: false, error: "server_misconfigured" });
    }

    const { questionId } = req.params;
    const existing = await ddb.send(
      new GetCommand({ TableName: QUESTIONS_TABLE, Key: { questionId } })
    );
    if (!existing.Item) {
      return res.status(404).json({ ok: false, error: "question_not_found" });
    }

    await ddb.send(new DeleteCommand({ TableName: QUESTIONS_TABLE, Key: { questionId } }));
    return res.json({ ok: true });
  } catch (err) {
    const error = mapDynamoError(err);
    logger.error("quiz_admin_delete_failed", { message: err.message, error });
    const status = error === "aws_not_configured" ? 503 : 500;
    return res.status(status).json({ ok: false, error });
  }
});

router.patch("/questions/:questionId/toggle-active", requireAdmin, async (req, res) => {
  try {
    if (!QUESTIONS_TABLE) {
      return res.status(500).json({ ok: false, error: "server_misconfigured" });
    }

    const { questionId } = req.params;
    const existing = await ddb.send(
      new GetCommand({ TableName: QUESTIONS_TABLE, Key: { questionId } })
    );
    if (!existing.Item) {
      return res.status(404).json({ ok: false, error: "question_not_found" });
    }

    const nextActive = !existing.Item.isActive;
    const out = await ddb.send(
      new UpdateCommand({
        TableName: QUESTIONS_TABLE,
        Key: { questionId },
        UpdateExpression: "SET isActive = :active, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
          ":active": nextActive,
          ":updatedAt": new Date().toISOString(),
        },
        ReturnValues: "ALL_NEW",
      })
    );

    return res.json({ ok: true, question: out.Attributes });
  } catch (err) {
    const error = mapDynamoError(err);
    logger.error("quiz_admin_toggle_failed", { message: err.message, error });
    const status = error === "aws_not_configured" ? 503 : 500;
    return res.status(status).json({ ok: false, error });
  }
});

function getMonthToDatePeriod() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endExclusive = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return {
    start: start.toISOString().slice(0, 10),
    end: today.toISOString().slice(0, 10),
    endExclusive: endExclusive.toISOString().slice(0, 10),
  };
}

function roundAmount(value) {
  return Math.round(Number(value || 0) * 100) / 100;
}

function parseCostsByService(resultsByTime) {
  const groups = resultsByTime?.[0]?.Groups || [];
  return groups
    .map((group) => ({
      service: group.Keys?.[0] || "Unknown",
      amount: roundAmount(group.Metrics?.UnblendedCost?.Amount),
    }))
    .filter((row) => row.amount > 0)
    .sort((a, b) => b.amount - a.amount);
}

function parseDailyCosts(resultsByTime) {
  return (resultsByTime || []).map((bucket) => ({
    date: bucket.TimePeriod?.Start || "",
    amount: roundAmount(bucket.Total?.UnblendedCost?.Amount),
  }));
}

function withPercentages(rows, total) {
  return rows.map((row) => ({
    service: row.service,
    amount: row.amount,
    percentage: total > 0 ? roundAmount((row.amount / total) * 100) : 0,
  }));
}

router.get("/costs", requireAdmin, async (req, res) => {
  try {
    const period = getMonthToDatePeriod();
    const timePeriod = { Start: period.start, End: period.endExclusive };

    const [byService, byDay] = await Promise.all([
      ce.send(
        new GetCostAndUsageCommand({
          TimePeriod: timePeriod,
          Granularity: "MONTHLY",
          Metrics: ["UnblendedCost"],
          GroupBy: [{ Type: "DIMENSION", Key: "SERVICE" }],
        })
      ),
      ce.send(
        new GetCostAndUsageCommand({
          TimePeriod: timePeriod,
          Granularity: "DAILY",
          Metrics: ["UnblendedCost"],
        })
      ),
    ]);

    const serviceRows = parseCostsByService(byService.ResultsByTime);
    const monthToDateTotal = roundAmount(serviceRows.reduce((sum, row) => sum + row.amount, 0));
    const currency =
      byService.ResultsByTime?.[0]?.Groups?.[0]?.Metrics?.UnblendedCost?.Unit ||
      byDay.ResultsByTime?.[0]?.Total?.UnblendedCost?.Unit ||
      "USD";

    return res.json({
      ok: true,
      period: { start: period.start, end: period.end },
      monthToDateTotal,
      currency,
      lastUpdated: new Date().toISOString(),
      costsByService: withPercentages(serviceRows, monthToDateTotal),
      dailyCosts: parseDailyCosts(byDay.ResultsByTime),
    });
  } catch (err) {
    const error = mapCostExplorerError(err);
    logger.error("admin_costs_failed", { message: err.message, error });
    const status =
      error === "aws_not_configured" ||
      error === "cost_explorer_access_denied" ||
      error === "cost_explorer_disabled"
        ? 503
        : 500;
    return res.status(status).json({ ok: false, error });
  }
});

router.post("/character-chat", requireAdmin, characterChatHandler);

module.exports = router;
