const { PutCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");
const { ddb } = require("../../config/dynamo");
const logger = require("../../utils/logger");
const { mapDynamoError } = require("../../utils/mapDynamoError");

const TABLE = process.env.SNAKE_BEST_SCORE_TABLE || "snake_bestScore";
const PK_VALUE = "snake";
const SK_VALUE = "global";
const MAX_SCORE = 100000;

module.exports = async function submitScore(req, res) {
  try {
    const score = Number(req.body?.score);

    if (!Number.isFinite(score) || score < 0 || score > MAX_SCORE) {
      return res.status(400).json({ ok: false, error: "invalid_score" });
    }

    const currentRes = await ddb.send(
      new GetCommand({
        TableName: TABLE,
        Key: { pk: PK_VALUE, sk: SK_VALUE },
      })
    );

    const currentBest = Number(currentRes.Item?.bestScore ?? 0) || 0;
    const newBest = Math.max(score, currentBest);

    if (newBest !== currentBest) {
      await ddb.send(
        new PutCommand({
          TableName: TABLE,
          Item: {
            pk: PK_VALUE,
            sk: SK_VALUE,
            bestScore: newBest,
            updatedAt: new Date().toISOString(),
          },
        })
      );
    }

    return res.json({ ok: true, bestScore: newBest });
  } catch (err) {
    const error = mapDynamoError(err);
    logger.error("snake_submit_score_failed", { message: err.message, error });
    const status = error === "aws_not_configured" ? 503 : 500;
    return res.status(status).json({ ok: false, error });
  }
};
