const crypto = require("crypto");

function getAdminPassword() {
  return process.env.QUIZ_ADMIN_PASSWORD || "";
}

function createAdminToken() {
  const password = getAdminPassword();
  if (!password) return null;
  return crypto.createHmac("sha256", password).update("quiz-admin-session").digest("hex");
}

function verifyAdminToken(token) {
  if (!token || typeof token !== "string") return false;
  const expected = createAdminToken();
  if (!expected) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

function requireAdmin(req, res, next) {
  const token = req.header("x-quiz-admin-token");
  if (!verifyAdminToken(token)) {
    return res.status(401).json({ ok: false, error: "unauthorized" });
  }
  return next();
}

module.exports = { createAdminToken, verifyAdminToken, requireAdmin, getAdminPassword };
