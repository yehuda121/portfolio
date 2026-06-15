# Portfolio Backend API

Express API for the portfolio application's interactive features: Snake global leaderboard and Developer Quiz sessions.

Deployed to **AWS Lambda** via GitHub Actions. Uses **DynamoDB** for persistence.

## Quiz Overview

The Developer Quiz stores all question content in DynamoDB (bilingual EN/HE). UI strings live in the frontend i18n files only.

**Categories:** `oop`, `data_structures`, `algorithms` (20+ questions each)

**Modes:**
- **Practice** — no timer; wrong answers are re-queued; explanations on demand after correct answers
- **Interview** — 10 timed questions (30/60/90/120s each); explanations only in the final summary

**Admin panel:** password-protected CRUD for questions via `/api/quiz/admin/*`

## API Endpoints

### Health
- `GET /health` — service status

### Snake (`/api/snake`)
- `GET /api/snake/best-score` — global best score
- `POST /api/snake/submit-score` — body: `{ "score": number }`

### Quiz (`/api/quiz`)

**Session**
- `POST /api/quiz/session/start` — body: `{ category, difficulty, mode, timePerQuestion? }`
- `POST /api/quiz/session/answer` — body: `{ questionId, selectedIndex?, lang, timedOut? }`
- `POST /api/quiz/session/explanation` — body: `{ questionId, lang }` (practice, after correct answer)
- `GET /api/quiz/session/current` — header: `x-anon-id`
- `GET /api/quiz/session/summary` — header: `x-anon-id`

**Questions**
- `GET /api/quiz/questions/next?lang=en|he` — header: `x-anon-id` (never returns `correctIndex`)

**Admin** (header: `x-quiz-admin-token`)
- `POST /api/quiz/admin/login` — body: `{ password }`
- `POST /api/quiz/admin/logout`
- `GET /api/quiz/admin/me`
- `GET /api/quiz/admin/questions` — query: `category`, `difficulty`, `active`, `search`
- `POST /api/quiz/admin/questions`
- `PUT /api/quiz/admin/questions/:questionId`
- `DELETE /api/quiz/admin/questions/:questionId`
- `PATCH /api/quiz/admin/questions/:questionId/toggle-active`

**Stats** (legacy)
- `POST /api/quiz/stats/upsert`
- `GET /api/quiz/stats` — header: `x-anon-id`
- `DELETE /api/quiz/stats` — header: `x-anon-id`

## Local Development

```bash
cp .env.example .env
npm install
npm run dev
```

Server starts at `http://localhost:5000`.

### Docker (from repo root)

```bash
docker compose up --build
```

Ensure `portfolio-backend/.env` includes AWS credentials and `QUIZ_ADMIN_PASSWORD`.

### Required environment variables

```env
PORT=5000
ALLOWED_ORIGINS=http://localhost:3000
AWS_REGION_DB=eu-north-1
SNAKE_BEST_SCORE_TABLE=snake_bestScore
QUIZ_USER_STATS_TABLE=quizUserStats
QUIZ_QUESTIONS_TABLE=quizQuestions
QUIZ_ADMIN_PASSWORD=change-me
```

AWS credentials must be available via your local AWS profile or environment (for DynamoDB access).

## DynamoDB Schema

### `quizQuestions`
| Field | Type | Notes |
|-------|------|-------|
| questionId | String (PK) | Unique ID |
| category | String | `oop`, `data_structures`, `algorithms` |
| difficulty | String | `junior`, `mid`, `senior` |
| isActive | Boolean | |
| questionText | Map | `{ en, he }` |
| answers | Map | `{ en: [4], he: [4] }` |
| correctIndex | Number | 0–3 (never sent to client before answer) |
| explanation | Map | `{ en, he }` |
| createdAt | String | ISO timestamp |
| updatedAt | String | ISO timestamp |

**GSI:** `categoryDifficultyIndex` — `category` (PK), `difficulty` (SK)

### `quizUserStats`
| Key | Type |
|-----|------|
| anonId | String (PK) |
| sessionCurrent | Map (active session state) |
| lastSessionSummary | Map (interview summary) |
| historyScores | List |
| historyTimestamps | List |
| expiresAt | Number (TTL epoch seconds) |

## Import / Reset Questions

Load the built-in dataset (60 questions across 3 categories):

```bash
npm run import:quiz
```

Delete all questions from `QUIZ_QUESTIONS_TABLE` then import fresh data (does **not** touch user stats):

```bash
npm run import:quiz:reset
```

You can also import a custom JSON file:

```bash
node src/scripts/importQuizQuestions.js --reset path/to/questions.json
```

Validation enforces: unique IDs, valid category/difficulty, bilingual text, exactly 4 answers, `correctIndex` 0–3, required explanations.

## Practice vs Interview

| Feature | Practice | Interview |
|---------|----------|-----------|
| Timer | None | 30/60/90/120s per question |
| Question count | Unlimited (reshuffles pool) | 10 questions |
| Wrong answers | Re-queued randomly | Counted in summary |
| Explanation during quiz | On wrong (auto); on correct (button) | Hidden until summary |
| Summary | N/A | Score + review of wrong/timed-out |

## Project Structure

```
src/
├── routes/quiz/
│   ├── session.js      # Session lifecycle
│   ├── questions.js    # Next question (no correctIndex leak)
│   ├── admin.js        # Admin CRUD + auth
│   └── stats.js
├── utils/
│   ├── quizConstants.js
│   ├── validateQuestion.js
│   ├── adminAuth.js
│   └── quizHelpers.js
└── scripts/
    ├── importQuizQuestions.js
    └── data/           # 60 bilingual questions
```

## Security

- CORS restricted via `ALLOWED_ORIGINS`
- Quiz answers validated server-side; `correctIndex` never sent before submission
- Admin password stored in `QUIZ_ADMIN_PASSWORD` (backend only)
- Stateless admin token via HMAC (suitable for local/demo)
- No secrets in source code — use environment variables only

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Run production server locally |
| `npm run dev` | Run with nodemon |
| `npm run check` | Syntax-check entry files |
| `npm run import:quiz` | Import questions to DynamoDB |
| `npm run import:quiz:reset` | Delete all questions, then import |
