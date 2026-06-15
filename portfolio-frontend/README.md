# Portfolio Frontend

React single-page application for Yehuda Shmulevitz's professional portfolio, tools, and games playground.

## Features

- Bilingual portfolio (English/Hebrew, RTL/LTR)
- Tools: JPG→PDF, PDF Merge, Developer Quiz
- Games: Snake, Minesweeper, Wizard Arena 3D
- Custom UI system: toasts, inline alerts, modals, error boundaries
- Lazy-loaded routes for smaller initial bundle

## Tech Stack

- React 18 + React Router 6
- i18next / react-i18next
- jspdf, pdf-lib (client-side PDF tools)
- Firebase Hosting (production)
- Custom CSS (no UI framework)

## Getting Started

```bash
cp .env.example .env
npm install
npm start
```

### Environment

| Variable | Description |
|----------|-------------|
| `REACT_APP_API_BASE_URL` | Backend API URL (required for Quiz and Snake) |

Example for local development:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

The `proxy` field in `package.json` also forwards unknown requests to `localhost:5000` during `npm start`.

## Project Structure

```
src/
├── api/client.js           # Centralized API fetch helper
├── components/ui/          # Toast, Modal, InlineAlert, ErrorBoundary
├── i18n/                   # en.json, he.json
├── portfolio/
│   ├── components/Navbar/
│   ├── pages/HomePage/
│   ├── tools/              # Quiz, JpgToPdf, PdfMerge, ToolsHome
│   └── games/              # Snake, Minesweeper, WizardArena, GamesHome
├── App.js                  # Routes + providers
└── index.js                # Entry point
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Development server (port 3000) |
| `npm run build` | Production build → `build/` |
| `npm test` | Run Jest tests |

## Build & Deploy

```bash
# Set production API URL before building
export REACT_APP_API_BASE_URL=https://your-lambda-url.amazonaws.com
npm run build
firebase deploy --only hosting
```

Firebase config: `firebase.json` (SPA rewrite to `index.html`).

## Docker

```bash
docker compose up --build
```

Serves the nginx container on port 3000.

## Adding a New Tool or Page

1. Create component under `src/portfolio/tools/` or `src/portfolio/games/`
2. Add route in `App.js` (lazy import)
3. Add i18n keys to `src/i18n/en.json` and `he.json`
4. Register in `ToolsHome.js` or `GamesHome.js` if needed

## Contact

- Email: yehuda.shmulevitz@gmail.com
- GitHub: [yehuda121](https://github.com/yehuda121)
