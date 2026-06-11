# RecipeSuggester — agent notes

Ingredient-based recipe suggestion app. React 19 + TypeScript + Vite; fully
static SPA — no server, no database, no env vars, no secrets. All data is
bundled in `src/data/` and user state lives in `localStorage`.

## Development

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b` + Vite bundle into `dist/`
- `npm run lint`

## Deployment (servy)

This app is hosted on `servy`, a home server reachable via `ssh servy`, alongside
the other apps indexed at `http://<servy-ip>:5000` (see the `servy-index` repo
for the full hosting conventions).

- Runs as the `recipe-suggester` container from `~/RecipeSuggester` on servy:
  multi-stage Dockerfile that builds the Vite bundle and serves `dist/` with
  nginx on container port 80.
- Reachable at host port **3002** and at `http://recipe-suggester.servy.lan`
  (Caddy reverse-proxies by container name over the external `caddy_shared`
  network). Note `recipes.servy.lan` belongs to the separate recipe_extractor
  app — don't confuse the two.
- Stateless: rebuilds lose nothing.
- To deploy changes: commit, push to GitHub, then
  `ssh servy 'cd ~/RecipeSuggester && git pull && docker compose up -d --build'`.
