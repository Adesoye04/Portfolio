# Adesoye Oyeyiola — Portfolio

Built with **Vite + React + Tailwind CSS + Framer Motion + amCharts + GSAP + Lenis**.

---

## Running locally

### Step 1 — Install Node.js
Download from https://nodejs.org (choose the LTS version).  
After installing, open your terminal and confirm it works:
```bash
node -v   # should print something like v20.x.x
npm -v    # should print something like 10.x.x
```

### Step 2 — Open the project folder in your terminal
```bash
cd path/to/portfolio
# e.g. cd ~/Downloads/portfolio
```

### Step 3 — Install dependencies
```bash
npm install
```
This downloads all packages into a `node_modules` folder. Takes about 30–60 seconds.

### Step 4 — Start the dev server
```bash
npm run dev
```
You'll see output like:
```
  VITE v5.x ready in 300ms
  ➜  Local:   http://localhost:5173/
```
Open that URL in your browser. The site hot-reloads on every save — no refresh needed.

---

## Editing content

All your data lives in **`src/data/index.js`**:
- `projects` — add/edit projects
- `skills`   — add/edit skill bubbles  
- `timeline` — add/edit experience entries
- `initiatives` — Techvantage, Stop the Spread
- `poems`    — add poems

---

## Adding your photo

1. Drop your photo in `public/` as `photo.jpg`
2. In `src/sections/Hero.jsx`, find the photo placeholder div and replace with:
```jsx
<img src="/photo.jpg" alt="Adesoye Oyeyiola" className="w-full h-full object-cover" />
```

---

## Building for production

```bash
npm run build
```
This creates a `dist/` folder with your optimised static site.

---

## Deploying to Vercel (free, recommended)

1. Push the project to a GitHub repo
2. Go to https://vercel.com → "Add New Project"
3. Import your GitHub repo
4. Vercel auto-detects Vite — just click **Deploy**
5. Your site is live at `yourname.vercel.app` in ~60 seconds

**Custom domain:** In Vercel → Settings → Domains → add `adesoye.dev` or similar.

---

## Deploying to GitHub Pages (alternative)

Install the GitHub Pages plugin:
```bash
npm install --save-dev gh-pages
```
Add to `package.json` scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```
Add to `vite.config.js`:
```js
base: '/your-repo-name/'
```
Then:
```bash
npm run deploy
```

---

## Folder structure

```
portfolio/
├── public/           ← static assets (photo, favicon)
├── src/
│   ├── data/
│   │   └── index.js  ← ALL your content lives here
│   ├── components/
│   │   ├── Cursor.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── Journey.jsx
│   │   └── OtherSections.jsx
│   ├── hooks/
│   │   └── useReveal.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```
