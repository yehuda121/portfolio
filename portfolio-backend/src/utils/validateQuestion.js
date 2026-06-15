const { VALID_CATEGORIES, VALID_DIFFICULTIES } = require("./quizConstants");

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateQuestion(q, { requireTimestamps = false } = {}) {
  const errors = [];
  const id = q?.questionId || "unknown";

  if (!isNonEmptyString(q?.questionId)) errors.push(`${id}: questionId is required`);
  if (!VALID_CATEGORIES.includes(q?.category)) errors.push(`${id}: invalid category`);
  if (!VALID_DIFFICULTIES.includes(q?.difficulty)) errors.push(`${id}: invalid difficulty`);
  if (typeof q?.isActive !== "boolean") errors.push(`${id}: isActive must be boolean`);

  if (!q?.questionText || !isNonEmptyString(q.questionText.en) || !isNonEmptyString(q.questionText.he)) {
    errors.push(`${id}: questionText.en and questionText.he are required`);
  }

  for (const lang of ["en", "he"]) {
    const answers = q?.answers?.[lang];
    if (!Array.isArray(answers) || answers.length !== 4) {
      errors.push(`${id}: answers.${lang} must have exactly 4 items`);
    } else if (answers.some((a) => !isNonEmptyString(a))) {
      errors.push(`${id}: answers.${lang} cannot contain empty strings`);
    }
  }

  if (!Number.isInteger(q?.correctIndex) || q.correctIndex < 0 || q.correctIndex > 3) {
    errors.push(`${id}: correctIndex must be 0, 1, 2, or 3`);
  }

  if (!q?.explanation || !isNonEmptyString(q.explanation.en) || !isNonEmptyString(q.explanation.he)) {
    errors.push(`${id}: explanation.en and explanation.he are required`);
  }

  if (requireTimestamps) {
    if (!isNonEmptyString(q?.createdAt)) errors.push(`${id}: createdAt is required`);
    if (!isNonEmptyString(q?.updatedAt)) errors.push(`${id}: updatedAt is required`);
  }

  return errors;
}

function assertUniqueQuestionIds(questions) {
  const seen = new Set();
  const errors = [];
  for (const q of questions) {
    if (seen.has(q.questionId)) errors.push(`Duplicate questionId: ${q.questionId}`);
    seen.add(q.questionId);
  }
  return errors;
}

module.exports = { validateQuestion, assertUniqueQuestionIds, isNonEmptyString };
