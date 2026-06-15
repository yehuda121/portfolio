require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { BatchWriteCommand } = require("@aws-sdk/lib-dynamodb");
const { ddb } = require("../config/dynamo");
const { validateQuestion, assertUniqueQuestionIds } = require("../utils/validateQuestion");

const QUESTIONS_TABLE = process.env.QUIZ_QUESTIONS_TABLE;
const DEFAULT_QUESTIONS_FILE = path.resolve(__dirname, "../../../questions/questionsList.json");

if (!process.env.AWS_REGION_DB) throw new Error("Missing AWS_REGION_DB");
if (!QUESTIONS_TABLE) throw new Error("Missing QUIZ_QUESTIONS_TABLE");

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function loadQuestions(inputPath) {
  const abs = path.resolve(inputPath || DEFAULT_QUESTIONS_FILE);
  if (!fs.existsSync(abs)) {
    throw new Error(`Questions file not found: ${abs}`);
  }

  const questions = JSON.parse(fs.readFileSync(abs, "utf8"));
  if (!Array.isArray(questions)) throw new Error("JSON must be an array");
  return { questions, abs };
}

function validateAll(questions) {
  const idErrors = assertUniqueQuestionIds(questions);
  if (idErrors.length) {
    console.error("Validation failed:");
    idErrors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  const allErrors = [];
  for (const q of questions) {
    allErrors.push(...validateQuestion(q, { requireTimestamps: true }));
  }

  if (allErrors.length) {
    console.error("Validation failed:");
    allErrors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }
}

async function batchWriteWithRetry(requestItems, maxRetries = 8) {
  let unprocessed = requestItems;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const res = await ddb.send(new BatchWriteCommand({ RequestItems: unprocessed }));
    unprocessed = res.UnprocessedItems || {};
    const left = unprocessed[QUESTIONS_TABLE]?.length || 0;
    if (left === 0) return;
    const delay = Math.min(2000, 2 ** attempt * 100);
    await new Promise((r) => setTimeout(r, delay));
  }
  throw new Error("BatchWrite exhausted retries: still has UnprocessedItems");
}

async function importQuestions(questions) {
  const putRequests = questions.map((q) => ({ PutRequest: { Item: q } }));
  const batches = chunk(putRequests, 25);

  for (let i = 0; i < batches.length; i++) {
    await batchWriteWithRetry({ [QUESTIONS_TABLE]: batches[i] });
    console.log(`Imported batch ${i + 1}/${batches.length}`);
  }

  console.log(`Done. Imported ${questions.length} questions into ${QUESTIONS_TABLE}`);
}

async function main() {
  const fileArg = process.argv[2];
  const { questions, abs } = loadQuestions(fileArg);

  console.log(`Loaded ${questions.length} questions from ${abs}`);
  validateAll(questions);
  console.log("Validation passed.");

  await importQuestions(questions);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
