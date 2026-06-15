function getAnonId(req) {
  const value = req.header("x-anon-id");
  if (!value) return null;
  const trimmed = value.trim();
  if (trimmed.length < 10 || trimmed.length > 64) return null;
  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) return null;
  return trimmed;
}

function pickLang(obj, lang) {
  if (!obj || typeof obj !== "object") return null;
  return obj[lang] ?? obj.en ?? null;
}

function calcExpiresAtDays(days) {
  return Math.floor((Date.now() + days * 24 * 60 * 60 * 1000) / 1000);
}

function requireQuizEnv(res) {
  const region = process.env.AWS_REGION_DB;
  const usersTable = process.env.QUIZ_USER_STATS_TABLE;
  const questionsTable = process.env.QUIZ_QUESTIONS_TABLE;

  if (!region) {
    res.status(500).json({ ok: false, error: "Missing AWS_REGION_DB" });
    return null;
  }
  if (!usersTable) {
    res.status(500).json({ ok: false, error: "Missing QUIZ_USER_STATS_TABLE" });
    return null;
  }

  return { region, usersTable, questionsTable };
}

module.exports = {
  getAnonId,
  pickLang,
  calcExpiresAtDays,
  requireQuizEnv,
};
