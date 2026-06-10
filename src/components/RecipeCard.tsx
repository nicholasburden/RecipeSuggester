import { matchColor } from '../lib/suggest';
import type { RecipeMatch } from '../lib/suggest';

interface Props {
  match: RecipeMatch;
  hasSelection: boolean;
  onOpen: (id: string) => void;
}

export function RecipeCard({ match, hasSelection, onOpen }: Props) {
  const { recipe, have, required, missing, score } = match;
  const pct = Math.round(score * 100);

  return (
    <button className="card" onClick={() => onOpen(recipe.id)}>
      <div
        className="card-art"
        style={{ background: `linear-gradient(135deg, ${recipe.gradient[0]}, ${recipe.gradient[1]})` }}
      >
        <span className="card-emoji">{recipe.emoji}</span>
        <span className="card-time">⏱ {recipe.minutes} min</span>
        {hasSelection && (
          <span className="card-badge" style={{ color: matchColor(score) }}>
            {pct === 100 ? '✓ Ready to cook' : `${pct}% match`}
          </span>
        )}
      </div>

      <div className="card-body">
        <div className="card-title-row">
          <h3 className="card-title">{recipe.name}</h3>
          <span className="card-cuisine">{recipe.cuisine}</span>
        </div>
        <p className="card-desc">{recipe.description}</p>

        <div className="card-tags">
          {recipe.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        {hasSelection && (
          <div className="card-match">
            <div className="match-bar">
              <div
                className="match-bar-fill"
                style={{ width: `${pct}%`, background: matchColor(score) }}
              />
            </div>
            <span className="match-label">
              {have.length}/{required.length} ingredients
            </span>
          </div>
        )}

        {hasSelection && missing.length > 0 && missing.length <= 3 && (
          <p className="card-missing">
            Just need: {missing.map((m) => `${m.emoji} ${m.name.toLowerCase()}`).join(', ')}
          </p>
        )}
      </div>
    </button>
  );
}
