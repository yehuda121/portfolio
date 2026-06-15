const express = require("express");

const statsRouter = require("./stats");
const sessionRouter = require("./session");
const questionsRouter = require("./questions");
const adminRouter = require("./admin");

const router = express.Router();

router.use("/stats", statsRouter);
router.use("/session", sessionRouter);
router.use("/questions", questionsRouter);
router.use("/admin", adminRouter);

router.get("/health", (req, res) => res.json({ ok: true }));

module.exports = router;
