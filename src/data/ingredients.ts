export type IngredientCategory =
  | 'Protein'
  | 'Vegetables'
  | 'Fruit'
  | 'Dairy & Eggs'
  | 'Grains & Pasta'
  | 'Pantry'
  | 'Herbs & Spices';

export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  category: IngredientCategory;
  /** Pantry staples can be assumed present when the user enables the toggle. */
  staple?: boolean;
}

export const INGREDIENTS: Ingredient[] = [
  // Protein
  { id: 'chicken-breast', name: 'Chicken breast', emoji: '🍗', category: 'Protein' },
  { id: 'chicken-thigh', name: 'Chicken thighs', emoji: '🍗', category: 'Protein' },
  { id: 'beef-mince', name: 'Beef mince', emoji: '🥩', category: 'Protein' },
  { id: 'beef-steak', name: 'Beef steak', emoji: '🥩', category: 'Protein' },
  { id: 'pork', name: 'Pork', emoji: '🥓', category: 'Protein' },
  { id: 'bacon', name: 'Bacon', emoji: '🥓', category: 'Protein' },
  { id: 'salmon', name: 'Salmon', emoji: '🐟', category: 'Protein' },
  { id: 'white-fish', name: 'White fish', emoji: '🐟', category: 'Protein' },
  { id: 'prawns', name: 'Prawns', emoji: '🦐', category: 'Protein' },
  { id: 'tofu', name: 'Tofu', emoji: '🧈', category: 'Protein' },
  { id: 'chickpeas', name: 'Chickpeas', emoji: '🫘', category: 'Protein' },
  { id: 'black-beans', name: 'Black beans', emoji: '🫘', category: 'Protein' },
  { id: 'lentils', name: 'Lentils', emoji: '🫘', category: 'Protein' },

  // Vegetables
  { id: 'onion', name: 'Onion', emoji: '🧅', category: 'Vegetables' },
  { id: 'garlic', name: 'Garlic', emoji: '🧄', category: 'Vegetables' },
  { id: 'tomato', name: 'Tomatoes', emoji: '🍅', category: 'Vegetables' },
  { id: 'bell-pepper', name: 'Bell pepper', emoji: '🫑', category: 'Vegetables' },
  { id: 'carrot', name: 'Carrots', emoji: '🥕', category: 'Vegetables' },
  { id: 'broccoli', name: 'Broccoli', emoji: '🥦', category: 'Vegetables' },
  { id: 'spinach', name: 'Spinach', emoji: '🥬', category: 'Vegetables' },
  { id: 'lettuce', name: 'Lettuce', emoji: '🥬', category: 'Vegetables' },
  { id: 'cucumber', name: 'Cucumber', emoji: '🥒', category: 'Vegetables' },
  { id: 'courgette', name: 'Courgette', emoji: '🥒', category: 'Vegetables' },
  { id: 'aubergine', name: 'Aubergine', emoji: '🍆', category: 'Vegetables' },
  { id: 'mushroom', name: 'Mushrooms', emoji: '🍄', category: 'Vegetables' },
  { id: 'potato', name: 'Potatoes', emoji: '🥔', category: 'Vegetables' },
  { id: 'sweet-potato', name: 'Sweet potato', emoji: '🍠', category: 'Vegetables' },
  { id: 'corn', name: 'Sweetcorn', emoji: '🌽', category: 'Vegetables' },
  { id: 'peas', name: 'Peas', emoji: '🟢', category: 'Vegetables' },
  { id: 'avocado', name: 'Avocado', emoji: '🥑', category: 'Vegetables' },
  { id: 'chilli', name: 'Fresh chilli', emoji: '🌶️', category: 'Vegetables' },
  { id: 'ginger', name: 'Ginger', emoji: '🫚', category: 'Vegetables' },
  { id: 'spring-onion', name: 'Spring onions', emoji: '🧅', category: 'Vegetables' },
  { id: 'celery', name: 'Celery', emoji: '🥬', category: 'Vegetables' },

  // Fruit
  { id: 'lemon', name: 'Lemon', emoji: '🍋', category: 'Fruit' },
  { id: 'lime', name: 'Lime', emoji: '🍋‍🟩', category: 'Fruit' },
  { id: 'banana', name: 'Banana', emoji: '🍌', category: 'Fruit' },
  { id: 'apple', name: 'Apple', emoji: '🍎', category: 'Fruit' },
  { id: 'mango', name: 'Mango', emoji: '🥭', category: 'Fruit' },
  { id: 'berries', name: 'Mixed berries', emoji: '🫐', category: 'Fruit' },

  // Dairy & Eggs
  { id: 'egg', name: 'Eggs', emoji: '🥚', category: 'Dairy & Eggs' },
  { id: 'milk', name: 'Milk', emoji: '🥛', category: 'Dairy & Eggs' },
  { id: 'butter', name: 'Butter', emoji: '🧈', category: 'Dairy & Eggs' },
  { id: 'cheddar', name: 'Cheddar cheese', emoji: '🧀', category: 'Dairy & Eggs' },
  { id: 'parmesan', name: 'Parmesan', emoji: '🧀', category: 'Dairy & Eggs' },
  { id: 'mozzarella', name: 'Mozzarella', emoji: '🧀', category: 'Dairy & Eggs' },
  { id: 'feta', name: 'Feta', emoji: '🧀', category: 'Dairy & Eggs' },
  { id: 'cream', name: 'Double cream', emoji: '🥛', category: 'Dairy & Eggs' },
  { id: 'yogurt', name: 'Greek yogurt', emoji: '🥛', category: 'Dairy & Eggs' },
  { id: 'coconut-milk', name: 'Coconut milk', emoji: '🥥', category: 'Dairy & Eggs' },

  // Grains & Pasta
  { id: 'rice', name: 'Rice', emoji: '🍚', category: 'Grains & Pasta' },
  { id: 'pasta', name: 'Pasta', emoji: '🍝', category: 'Grains & Pasta' },
  { id: 'spaghetti', name: 'Spaghetti', emoji: '🍝', category: 'Grains & Pasta' },
  { id: 'noodles', name: 'Noodles', emoji: '🍜', category: 'Grains & Pasta' },
  { id: 'bread', name: 'Bread', emoji: '🍞', category: 'Grains & Pasta' },
  { id: 'tortilla', name: 'Tortillas', emoji: '🫓', category: 'Grains & Pasta' },
  { id: 'flour', name: 'Flour', emoji: '🌾', category: 'Grains & Pasta', staple: true },
  { id: 'oats', name: 'Oats', emoji: '🌾', category: 'Grains & Pasta' },
  { id: 'quinoa', name: 'Quinoa', emoji: '🌾', category: 'Grains & Pasta' },
  { id: 'breadcrumbs', name: 'Breadcrumbs', emoji: '🍞', category: 'Grains & Pasta' },

  // Pantry
  { id: 'olive-oil', name: 'Olive oil', emoji: '🫒', category: 'Pantry', staple: true },
  { id: 'soy-sauce', name: 'Soy sauce', emoji: '🍶', category: 'Pantry' },
  { id: 'honey', name: 'Honey', emoji: '🍯', category: 'Pantry' },
  { id: 'tinned-tomatoes', name: 'Tinned tomatoes', emoji: '🥫', category: 'Pantry' },
  { id: 'tomato-paste', name: 'Tomato paste', emoji: '🥫', category: 'Pantry' },
  { id: 'stock', name: 'Stock', emoji: '🍲', category: 'Pantry' },
  { id: 'sugar', name: 'Sugar', emoji: '🍬', category: 'Pantry', staple: true },
  { id: 'vinegar', name: 'Vinegar', emoji: '🍶', category: 'Pantry', staple: true },
  { id: 'sesame-oil', name: 'Sesame oil', emoji: '🍶', category: 'Pantry' },
  { id: 'peanut-butter', name: 'Peanut butter', emoji: '🥜', category: 'Pantry' },
  { id: 'chocolate', name: 'Dark chocolate', emoji: '🍫', category: 'Pantry' },
  { id: 'curry-paste', name: 'Curry paste', emoji: '🥫', category: 'Pantry' },
  { id: 'mayo', name: 'Mayonnaise', emoji: '🥚', category: 'Pantry' },

  // Herbs & Spices
  { id: 'salt', name: 'Salt', emoji: '🧂', category: 'Herbs & Spices', staple: true },
  { id: 'black-pepper', name: 'Black pepper', emoji: '🧂', category: 'Herbs & Spices', staple: true },
  { id: 'basil', name: 'Fresh basil', emoji: '🌿', category: 'Herbs & Spices' },
  { id: 'coriander', name: 'Coriander', emoji: '🌿', category: 'Herbs & Spices' },
  { id: 'parsley', name: 'Parsley', emoji: '🌿', category: 'Herbs & Spices' },
  { id: 'rosemary', name: 'Rosemary', emoji: '🌿', category: 'Herbs & Spices' },
  { id: 'thyme', name: 'Thyme', emoji: '🌿', category: 'Herbs & Spices' },
  { id: 'cumin', name: 'Cumin', emoji: '🟤', category: 'Herbs & Spices' },
  { id: 'paprika', name: 'Paprika', emoji: '🔴', category: 'Herbs & Spices' },
  { id: 'chilli-flakes', name: 'Chilli flakes', emoji: '🌶️', category: 'Herbs & Spices', staple: true },
  { id: 'oregano', name: 'Dried oregano', emoji: '🌿', category: 'Herbs & Spices', staple: true },
  { id: 'curry-powder', name: 'Curry powder', emoji: '🟡', category: 'Herbs & Spices' },
  { id: 'cinnamon', name: 'Cinnamon', emoji: '🟤', category: 'Herbs & Spices' },
];

export const INGREDIENT_MAP: Map<string, Ingredient> = new Map(
  INGREDIENTS.map((i) => [i.id, i]),
);

export const CATEGORY_COLORS: Record<IngredientCategory, string> = {
  Protein: '#f87171',
  Vegetables: '#4ade80',
  Fruit: '#facc15',
  'Dairy & Eggs': '#93c5fd',
  'Grains & Pasta': '#fdba74',
  Pantry: '#c4b5fd',
  'Herbs & Spices': '#5eead4',
};
