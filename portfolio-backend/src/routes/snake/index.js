const express = require("express");          // Import Express
const getBestScore = require("./getBestScore");   // Import handler for GET best score
const submitScore = require("./submitScore");     // Import handler for POST submit score

const router = express.Router();             // Create isolated router instance

router.get("/best-score", getBestScore);     // GET /api/snake/best-score
router.post("/submit-score", submitScore);   // POST /api/snake/submit-score

module.exports = router;                     // Export router to app.js
