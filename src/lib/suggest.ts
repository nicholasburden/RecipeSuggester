import { INGREDIENT_MAP } from '../data/ingredients';
import type { Ingredient } from '../data/ingredients';
import type { Recipe } from '../data/recipes';

export interface RecipeMatch {
  recipe: Recipe;
  /** Required (non-optional, non-assumed) ingredients in the recipe. */
  required: Ingredient[];
  have: Ingredient[];
  missing: Ingredient[];
  /** 0–1 share of required ingredients the user has. */
  score: number;
  /** Bonus optional ingredients the user also has. */
  optionalHave: Ingredient[];
}

export interface SuggestOptions {
  /** Treat pantry staples (salt, oil, sugar…) as always available. */
  assumeStaples: boolean;
}

export function matchRecipe(
  recipe: Recipe,
  selectedIds: Set<string>,
  { assumeStaples }: SuggestOptions,
): RecipeMatch {
  const required: Ingredient[] = [];
  const have: Ingredient[] = [];
  const missing: Ingredient[] = [];
  const optionalHave: Ingredient[] = [];

  for (const ri of recipe.ingredients) {
    const ing = INGREDIENT_MAP.get(ri.id);
    if (!ing) continue;
    if (ri.optional) {
      if (selectedIds.has(ing.id)) optionalHave.push(ing);
      continue;
    }
    if (assumeStaples && ing.staple && !selectedIds.has(ing.id)) continue;
    required.push(ing);
    if (selectedIds.has(ing.id)) have.push(ing);
    else missing.push(ing);
  }

  const score = required.length === 0 ? 1 : have.length / required.length;
  return { recipe, required, have, missing, score, optionalHave };
}

export type SortMode = 'match' | 'missing' | 'time';

export function matchColor(score: number): string {
  if (score >= 0.999) return 'var(--green)';
  if (score >= 0.6) return 'var(--amber)';
  return 'var(--red)';
}

export function suggestRecipes(
  recipes: Recipe[],
  selectedIds: Set<string>,
  options: SuggestOptions,
  sort: SortMode,
): RecipeMatch[] {
  const matches = recipes.map((r) => matchRecipe(r, selectedIds, options));

  const hasSelection = selectedIds.size > 0;
  const visible = hasSelection ? matches.filter((m) => m.have.length > 0) : matches;

  return visible.sort((a, b) => {
    if (sort === 'time') return a.recipe.minutes - b.recipe.minutes;
    if (sort === 'missing') {
      if (a.missing.length !== b.missing.length) return a.missing.length - b.missing.length;
      return b.score - a.score;
    }
    // 'match': score first, then fewer absolute missing, then more bonus matches
    if (b.score !== a.score) return b.score - a.score;
    if (a.missing.length !== b.missing.length) return a.missing.length - b.missing.length;
    return b.optionalHave.length - a.optionalHave.length;
  });
}

/** Recipes similar to the given one, ranked by shared ingredients and tags. */
export function similarRecipes(recipe: Recipe, all: Recipe[], limit = 3): Recipe[] {
  const ids = new Set(recipe.ingredients.map((i) => i.id));
  const tags = new Set(recipe.tags);
  return all
    .filter((r) => r.id !== recipe.id)
    .map((r) => {
      const sharedIngredients = r.ingredients.filter((i) => ids.has(i.id)).length;
      const sharedTags = r.tags.filter((t) => tags.has(t)).length;
      const cuisineBonus = r.cuisine === recipe.cuisine ? 2 : 0;
      return { r, s: sharedIngredients + sharedTags * 2 + cuisineBonus };
    })
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.r);
}
