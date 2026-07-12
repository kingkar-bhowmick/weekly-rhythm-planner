# Weekly Rhythm Planner

A printable, editable weekly planner built around three energy-based
themes — **Morning Momentum**, **Flex Zone**, and **Social & Wind-Down**
— instead of hour-by-hour scheduling. Click into any cell and type your
tasks; everything saves automatically in your browser. Hit **Print** for
a clean landscape sheet to put on the wall.

Built with [Vite](https://vitejs.dev) + React.

---

## 1. Run it locally (macOS / VS Code)

You need [Node.js](https://nodejs.org) 20.19+ installed. Check with:

```bash
node -v
```

Then, in VS Code's integrated terminal (or Terminal.app), from the
unzipped project folder:

```bash
cd weekly-rhythm-planner
npm install
npm run dev
```

This starts a local dev server — Vite will print a URL like
`http://localhost:5173`. Open it in your browser. Changes to the code
hot-reload automatically.

To stop the server: `Ctrl + C` in the terminal.

---

## 2. How persistence works right now

Every task you type is saved to your browser's `localStorage` on the
device you're using — it survives closing the tab, reloading, and
restarting your laptop. It does **not** sync across devices (e.g.
phone ↔ laptop), because that requires a real backend database.

If you later want cross-device sync, the cleanest low-effort options
are:

- **Supabase** (free tier, Postgres-backed) — swap the `localStorage`
  calls in `src/Editable.jsx` for Supabase client calls.
- **Vercel KV / Vercel Postgres** — similar idea, tighter Vercel
  integration since you're already deploying there.

Both need you to create an account and add an API key as an
environment variable — happy to wire either one in if you want that
later. For now, `localStorage` is genuinely persistent for a single
device, which covers "open it every morning on my laptop."

---

## 3. Push the code to GitHub

From inside the project folder:

```bash
git init
git add .
git commit -m "Initial commit: weekly rhythm planner"
```

Create a new empty repo on GitHub (via [github.com/new](https://github.com/new) —
do **not** initialize it with a README, since you already have one).
Then, replacing `YOUR-USERNAME`:

```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/weekly-rhythm-planner.git
git push -u origin main
```

If you don't have the GitHub CLI or SSH keys set up and it prompts
for a password, GitHub now requires a [Personal Access Token](https://github.com/settings/tokens)
instead of your account password — generate one with `repo` scope and
paste it in when prompted.

---

## 4. Deploy to Vercel

### Option A — Vercel CLI (fastest)

```bash
npm install -g vercel
vercel login
vercel
```

Answer the prompts (link to a new project, keep defaults — Vercel
auto-detects Vite). For a production deployment:

```bash
vercel --prod
```

You'll get a live `https://your-project.vercel.app` URL.

### Option B — Vercel dashboard (recommended if you want auto-deploys)

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with
   GitHub.
2. Import the `weekly-rhythm-planner` repo you just pushed.
3. Framework preset: Vercel detects **Vite** automatically. Leave
   build command (`vite build`) and output directory (`dist`) as
   default.
4. Click **Deploy**.

From then on, every `git push` to `main` auto-deploys a new version —
no need to run `vercel` manually again.

---

## 5. Project structure

```
weekly-rhythm-planner/
├── index.html          # HTML shell + Google Fonts
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx         # React entry point
│   ├── App.jsx          # Planner layout (grid, legend, footer)
│   ├── Editable.jsx     # Self-saving contentEditable component
│   └── index.css        # All styling, including print layout
└── README.md
```

To change the theme names, times, or colors, edit the `THEMES` array
near the top of `src/App.jsx` and the corresponding CSS variables
(`--morning`, `--flex`, `--winddown`) at the top of `src/index.css`.
