const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const { ddb } = require("../../config/dynamo");
const logger = require("../../utils/logger");
const { mapDynamoError } = require("../../utils/mapDynamoError");

const TABLE = process.env.SNAKE_BEST_SCORE_TABLE || "snake_bestScore";
const PK_VALUE = "snake";
const SK_VALUE = "global";

module.exports = async function getBestScore(_req, res) {
  try {
    const result = await ddb.send(
      new GetCommand({
        TableName: TABLE,
        Key: { pk: PK_VALUE, sk: SK_VALUE },
      })
    );

    const bestScore = Number(result.Item?.bestScore ?? 0) || 0;
    return res.json({ ok: true, bestScore });
  } catch (err) {
    const error = mapDynamoError(err);
    logger.error("snake_get_best_score_failed", { message: err.message, error });
    const status = error === "aws_not_configured" ? 503 : 500;
    return res.status(status).json({ ok: false, error });
  }
};
