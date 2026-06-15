const cors = require("cors");

const CORS_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"];
const CORS_ALLOWED_HEADERS = ["Content-Type", "x-anon-id", "x-quiz-admin-token"];

const DEFAULT_ORIGINS = [
  "http://localhost:3000",
  "https://gamehub-4753a.web.app",
  "https://gamehub-4753a.firebaseapp.com",
];

function getAllowedOrigins() {
  const raw = process.env.ALLOWED_ORIGINS;
  if (raw) {
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return DEFAULT_ORIGINS;
}

function resolveCorsOrigin(req) {
  const allowed = getAllowedOrigins();
  const allowAll = allowed.includes("*");
  const origin = req.headers.origin;

  if (allowAll) return "*";
  if (!origin) return allowed[0] || null;
  if (allowed.includes(origin)) return origin;
  return null;
}

function applyCorsHeaders(req, res) {
  const origin = resolveCorsOrigin(req);
  if (!origin) return;

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", CORS_METHODS.join(","));
  res.setHeader("Access-Control-Allow-Headers", CORS_ALLOWED_HEADERS.join(","));
}

function createCorsMiddleware() {
  const allowed = getAllowedOrigins();
  const allowAll = allowed.includes("*");

  return cors({
    origin(origin, callback) {
      if (allowAll || !origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: CORS_METHODS,
    allowedHeaders: CORS_ALLOWED_HEADERS,
    maxAge: 86400,
  });
}

module.exports = {
  createCorsMiddleware,
  getAllowedOrigins,
  applyCorsHeaders,
};
