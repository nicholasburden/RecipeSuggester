import { useEffect, useMemo, useState } from 'react';
import { IngredientPicker } from './components/IngredientPicker';
import { RecipeCard } from './components/RecipeCard';
import { RecipeModal } from './components/RecipeModal';
import { CATEGORY_COLORS, INGREDIENT_MAP } from './data/ingredients';
import { RECIPES } from './data/recipes';
import { suggestRecipes } from './lib/suggest';
import type { SortMode } from './lib/suggest';

const STORAGE_KEY = 'recipe-suggester:selected';

const QUICK_PICKS = ['chicken-breast', 'tomato', 'onion', 'garlic', 'egg', 'rice', 'pasta', 'cheddar'];

function loadSelected(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const ids: unknown = JSON.parse(raw);
    if (!Array.isArray(ids)) return new Set();
    return new Set(ids.filter((id): id is string => typeof id === 'string' && INGREDIENT_MAP.has(id)));
  } catch {
    return new Set();
  }
}

export default function App() {
  const [selected, setSelected] = useState<Set<string>>(loadSelected);
  const [assumeStaples, setAssumeStaples] = useState(true);
  const [sort, setSort] = useState<SortMode>('match');
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [openRecipe, setOpenRecipe] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...selected]));
  }, [selected]);

  const addIngredient = (id: string) =>
    setSelected((prev) => new Set(prev).add(id));

  const removeIngredient = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });

  const allTags = useMemo(
    () => [...new Set(RECIPES.flatMap((r) => r.tags))].sort(),
    [],
  );

  const matches = useMemo(() => {
    const ranked = suggestRecipes(RECIPES, selected, { assumeStaples }, sort);
    return tagFilter ? ranked.filter((m) => m.recipe.tags.includes(tagFilter)) : ranked;
  }, [selected, assumeStaples, sort, tagFilter]);

  const hasSelection = selected.size > 0;
  const readyCount = hasSelection ? matches.filter((m) => m.missing.length === 0).length : 0;
  const current = openRecipe ? RECIPES.find((r) => r.id === openRecipe) : undefined;

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-mark">🍳</span>
          <span className="logo-text">
            Recipe<em>Suggester</em>
          </span>
        </div>
        <span className="header-tagline">Tell us what’s in your kitchen — we’ll find dinner.</span>
      </header>

      <section className="hero">
        <h1 className="hero-title">What can I cook tonight?</h1>
        <p className="hero-sub">
          Add the ingredients you have and we’ll rank {RECIPES.length} recipes by how close you are to a meal.
        </p>

        <IngredientPicker selected={selected} onAdd={addIngredient} />

        {hasSelection ? (
          <div className="chips">
            {[...selected].map((id) => {
              const ing = INGREDIENT_MAP.get(id);
              if (!ing) return null;
              return (
                <button
                  key={id}
                  className="chip"
                  onClick={() => removeIngredient(id)}
                  title={`Remove ${ing.name}`}
                  style={{ borderColor: `${CATEGORY_COLORS[ing.category]}55` }}
                >
                  <span className="chip-pic">{ing.emoji}</span>
                  {ing.name}
                  <span className="chip-x">✕</span>
                </button>
              );
            })}
            <button className="chip chip-clear" onClick={() => setSelected(new Set())}>
              Clear all
            </button>
          </div>
        ) : (
          <div className="quick-picks">
            <span className="quick-label">Popular:</span>
            {QUICK_PICKS.map((id) => {
              const ing = INGREDIENT_MAP.get(id);
              if (!ing) return null;
              return (
                <button key={id} className="chip chip-ghost" onClick={() => addIngredient(id)}>
                  <span className="chip-pic">{ing.emoji}</span>
                  {ing.name}
                </button>
              );
            })}
          </div>
        )}
      </section>

      <section className="results">
        <div className="results-bar">
          <h2 className="results-title">
            {hasSelection ? (
              <>
                Suggestions
                <span className="results-count">
                  {matches.length} match{matches.length === 1 ? '' : 'es'}
                  {readyCount > 0 && ` · ${readyCount} ready to cook`}
                </span>
              </>
            ) : (
              <>
                Browse all recipes
                <span className="results-count">{matches.length} recipes</span>
              </>
            )}
          </h2>

          <div className="controls">
            <label className="toggle">
              <input
                type="checkbox"
                checked={assumeStaples}
                onChange={(e) => setAssumeStaples(e.target.checked)}
              />
              <span className="toggle-track" aria-hidden="true" />
              Assume pantry staples
            </label>
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              aria-label="Sort recipes"
            >
              <option value="match">Best match</option>
              <option value="missing">Fewest missing</option>
              <option value="time">Quickest first</option>
            </select>
          </div>
        </div>

        <div className="tag-filters">
          <button
            className={`tag-filter ${tagFilter === null ? 'active' : ''}`}
            onClick={() => setTagFilter(null)}
          >
            All
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              className={`tag-filter ${tagFilter === t ? 'active' : ''}`}
              onClick={() => setTagFilter(tagFilter === t ? null : t)}
            >
              {t}
            </button>
          ))}
        </div>

        {matches.length === 0 ? (
          <div className="empty">
            <span className="empty-emoji">🔍</span>
            <h3>No recipes match yet</h3>
            <p>
              Try adding a few more ingredients{tagFilter ? ` or clearing the “${tagFilter}” filter` : ''} —
              staples like onion, garlic and tomatoes unlock a lot of dishes.
            </p>
          </div>
        ) : (
          <div className="grid">
            {matches.map((m) => (
              <RecipeCard
                key={m.recipe.id}
                match={m}
                hasSelection={hasSelection}
                onOpen={setOpenRecipe}
              />
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        Built with React · {RECIPES.length} recipes · your ingredient list is saved locally
      </footer>

      {current && (
        <RecipeModal
          recipe={current}
          selected={selected}
          assumeStaples={assumeStaples}
          onClose={() => setOpenRecipe(null)}
          onOpenRecipe={setOpenRecipe}
        />
      )}
    </div>
  );
}
