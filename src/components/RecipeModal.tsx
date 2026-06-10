import { useEffect, useRef } from 'react';
import { INGREDIENT_MAP } from '../data/ingredients';
import { RECIPES } from '../data/recipes';
import type { Recipe } from '../data/recipes';
import { matchRecipe, similarRecipes } from '../lib/suggest';

interface Props {
  recipe: Recipe;
  selected: Set<string>;
  assumeStaples: boolean;
  onClose: () => void;
  onOpenRecipe: (id: string) => void;
}

export function RecipeModal({ recipe, selected, assumeStaples, onClose, onOpenRecipe }: Props) {
  const match = matchRecipe(recipe, selected, { assumeStaples });
  const similar = similarRecipes(recipe, RECIPES);
  const hasSelection = selected.size > 0;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [recipe.id]);

  const ownedStatus = (id: string, optional?: boolean) => {
    if (selected.has(id)) return 'have';
    const ing = INGREDIENT_MAP.get(id);
    if (assumeStaples && ing?.staple) return 'staple';
    if (optional) return 'optional';
    return hasSelection ? 'missing' : 'neutral';
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={recipe.name} ref={scrollRef}>
        <div
          className="modal-hero"
          style={{ background: `linear-gradient(135deg, ${recipe.gradient[0]}, ${recipe.gradient[1]})` }}
        >
          <button className="modal-close" onClick={onClose} aria-label="Close recipe">✕</button>
          <span className="modal-hero-emoji">{recipe.emoji}</span>
          <div className="modal-hero-text">
            <span className="modal-cuisine">{recipe.cuisine}</span>
            <h2 className="modal-title">{recipe.name}</h2>
            <p className="modal-desc">{recipe.description}</p>
          </div>
        </div>

        <div className="modal-meta">
          <div className="meta-item"><span className="meta-value">⏱ {recipe.minutes}</span><span className="meta-label">minutes</span></div>
          <div className="meta-item"><span className="meta-value">🍽 {recipe.servings}</span><span className="meta-label">servings</span></div>
          <div className="meta-item"><span className="meta-value">📊 {recipe.difficulty}</span><span className="meta-label">difficulty</span></div>
          <div className="meta-item"><span className="meta-value">🔥 {recipe.calories}</span><span className="meta-label">kcal / serving</span></div>
        </div>

        {hasSelection && (
          <div className="modal-match-banner">
            {match.missing.length === 0 ? (
              <span className="banner-ready">✓ You have everything you need — let’s cook!</span>
            ) : (
              <span className="banner-missing">
                You have {match.have.length} of {match.required.length} ingredients · missing{' '}
                {match.missing.map((m) => m.name.toLowerCase()).join(', ')}
              </span>
            )}
          </div>
        )}

        <div className="modal-columns">
          <section className="modal-ingredients">
            <h3 className="section-title">Ingredients</h3>
            <ul className="ing-list">
              {recipe.ingredients.map((ri) => {
                const ing = INGREDIENT_MAP.get(ri.id);
                if (!ing) return null;
                const status = ownedStatus(ri.id, ri.optional);
                return (
                  <li key={ri.id} className={`ing-row ${status}`}>
                    <span className="ing-row-pic">{ing.emoji}</span>
                    <span className="ing-row-name">
                      {ing.name}
                      {ri.optional && <em className="ing-optional"> · optional</em>}
                    </span>
                    <span className="ing-row-amount">{ri.amount}</span>
                    <span className="ing-row-status">
                      {status === 'have' && '✓'}
                      {status === 'staple' && '·'}
                      {status === 'missing' && '✗'}
                    </span>
                  </li>
                );
              })}
            </ul>
            {assumeStaples && (
              <p className="ing-footnote">· pantry staples assumed available</p>
            )}
          </section>

          <section className="modal-steps">
            <h3 className="section-title">Method</h3>
            <ol className="step-list">
              {recipe.steps.map((step, i) => (
                <li key={i} className="step-row">
                  <span className="step-num">{i + 1}</span>
                  <p className="step-text">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section className="modal-similar">
          <h3 className="section-title">You might also like</h3>
          <div className="similar-row">
            {similar.map((r) => (
              <button key={r.id} className="similar-card" onClick={() => onOpenRecipe(r.id)}>
                <span
                  className="similar-art"
                  style={{ background: `linear-gradient(135deg, ${r.gradient[0]}, ${r.gradient[1]})` }}
                >
                  {r.emoji}
                </span>
                <span className="similar-name">{r.name}</span>
                <span className="similar-meta">⏱ {r.minutes} min · {r.difficulty}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
