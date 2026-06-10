# 🍳 RecipeSuggester

**Tell us what's in your kitchen — we'll find dinner.**

A dark, clean, modern single-page app that suggests recipes based on the
ingredients you have. Pick ingredients from an autocomplete dropdown (with
pictures), and the app ranks 100 built-in recipes by how close you are to a
complete meal — then shows you the full recipe.

## Features

- **Ingredient autocomplete** — searchable dropdown with picture tiles,
  category labels, match highlighting, and full keyboard navigation
  (↑ / ↓ / Enter / Esc).
- **Smart suggestions** — recipes ranked by match percentage, with a
  colour-coded progress bar, a "ready to cook" badge, and "just need: …"
  hints when you're one or two ingredients away.
- **Pantry staples toggle** — assume salt, oil, sugar and other staples are
  available so they don't count against your match.
- **Sorting & filtering** — best match / fewest missing / quickest first,
  plus tag filters (Vegan, Quick, Comfort food, …).
- **Full recipe view** — hero header, time / servings / difficulty /
  calories, an ingredient checklist marking what you have and what you're
  missing, numbered method steps, and similar-recipe recommendations.
- **Persistence** — your ingredient list is saved to `localStorage`.
- **Fully offline** — ingredient and recipe data (206 ingredients,
  100 recipes) is bundled; no APIs, no flaky image URLs.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run lint     # run ESLint
npm run preview  # serve the production build
```

## Tech stack

- [React 19](https://react.dev/) + TypeScript
- [Vite](https://vite.dev/) for dev server and bundling
- Hand-rolled CSS (no UI framework) — custom dark theme with CSS variables

## Project structure

```
src/
  data/
    ingredients.ts   # ingredient catalog (id, name, picture, category, staple flag)
    recipes.ts       # recipe catalog (ingredients, steps, meta, artwork)
  lib/
    suggest.ts       # matching/ranking engine + similar-recipe scoring
  components/
    IngredientPicker.tsx  # autocomplete dropdown with pictures
    RecipeCard.tsx        # suggestion card with match bar
    RecipeModal.tsx       # full recipe view
  App.tsx            # page layout, state, filters
  index.css          # dark theme
```

## How matching works

For each recipe, required (non-optional) ingredients are compared against
your selection. The score is `have / required`; optional ingredients never
count against you but break ties in your favour. With the pantry-staples
toggle on, staples you haven't explicitly added are excluded from the
requirement. Recipes with zero matching ingredients are hidden once you've
selected something.
