const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const REGION = process.env.AWS_REGION_DB;

if (!REGION) {
  console.warn("[config] AWS_REGION_DB is not set — DynamoDB calls will fail.");
}

const ddb = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: REGION }),
  { marshallOptions: { removeUndefinedValues: true } }
);

module.exports = { ddb, REGION };
