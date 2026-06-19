const express = require("express");
const { createCorsMiddleware, applyCorsHeaders } = require("./config/cors");
const logger = require("./utils/logger");

const app = express();

app.use(createCorsMiddleware());
app.use((req, res, next) => {
  const isCharacterChat =
    req.method === "POST" &&
    (req.path === "/api/quiz/admin/character-chat" ||
      req.originalUrl?.includes("/api/quiz/admin/character-chat"));
  express.json({ limit: isCharacterChat ? "5mb" : "16kb" })(req, res, next);
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    logger.info("request", {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      ms: Date.now() - start,
    });
  });
  next();
});

const snakeRouter = require("./routes/snake");
const quizRouter = require("./routes/quiz");

app.use("/api/snake", snakeRouter);
app.use("/api/quiz", quizRouter);

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use((err, req, res, _next) => {
  applyCorsHeaders(req, res); // CORS on all error responses
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ ok: false, error: "cors_forbidden" });
  }
  logger.error("unhandled_error", { message: err.message });
  return res.status(500).json({ ok: false, error: "internal_server_error" });
});

module.exports = app;
