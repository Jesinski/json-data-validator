type Ingredient = {
  id: string;
  name: string;
  unit: string;
  default: number;
  tags: string[];
};

type Step = {
  id: string;
  description: string;
  inputs: string[];
};

type Tag = {
  id: string;
  description: string;
};

type Recipe = {
  name: string;
  recipeId: string;
  ingredients: Ingredient[];
  steps: Step[];
  tags: Tag[];
};

type ValidationResult = {
  valid: boolean;
  errors: string[];
};

function validateName(name: string): ValidationResult {
  const errors: string[] = [];
  if (!name || typeof name !== "string") {
    errors.push("Name is required and must be a string.");
  }
  return { valid: errors.length === 0, errors };
}

function validateRecipeId(recipeId: string): ValidationResult {
  const errors: string[] = [];
  const maxLength = 50;
  const allowedChars = /^[a-zA-Z0-9_\-]+$/;
  if (!recipeId) {
    errors.push("recipeId is required.");
  }
  if (recipeId.length > maxLength) {
    errors.push(`recipeId must be at most ${maxLength} characters.`);
  }
  if (!allowedChars.test(recipeId)) {
    errors.push("recipeId contains invalid characters.");
  }
  return { valid: errors.length === 0, errors };
}

function validateIngredients(ingredients: Ingredient[]): ValidationResult {
  const errors: string[] = [];
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    errors.push("At least one ingredient is required.");
    return { valid: false, errors };
  }
  ingredients.forEach((ing, idx) => {
    if (!ing.id) errors.push(`Ingredient at index ${idx} is missing id.`);
    if (!ing.name) errors.push(`Ingredient at index ${idx} is missing name.`);
    if (!ing.unit) errors.push(`Ingredient at index ${idx} is missing unit.`);
    if (typeof ing.default !== "number")
      errors.push(`Ingredient at index ${idx} has invalid default.`);
    if (!Array.isArray(ing.tags))
      errors.push(`Ingredient at index ${idx} has invalid tags.`);
  });
  return { valid: errors.length === 0, errors };
}

function validateTags(tags: Tag[]): ValidationResult {
  const errors: string[] = [];
  if (!Array.isArray(tags)) {
    errors.push("Tags must be an array.");
    return { valid: false, errors };
  }
  tags.forEach((tag, idx) => {
    if (!tag.id) errors.push(`Tag at index ${idx} is missing id.`);
    if (!tag.description)
      errors.push(`Tag at index ${idx} is missing description.`);
  });
  return { valid: errors.length === 0, errors };
}

function validateSteps(
  steps: Step[],
  ingredients: Ingredient[]
): ValidationResult {
  const errors: string[] = [];
  if (!Array.isArray(steps) || steps.length === 0) {
    errors.push("At least one step is required.");
    return { valid: false, errors };
  }

  // Collect valid input ids (ingredients + previous steps)
  const ingredientIds = new Set(ingredients.map((i) => i.id));
  const stepIds: Set<string> = new Set();

  steps.forEach((step, idx) => {
    if (!step.id) errors.push(`Step at index ${idx} is missing id.`);
    if (!step.description)
      errors.push(`Step at index ${idx} is missing description.`);
    if (!Array.isArray(step.inputs) || step.inputs.length === 0) {
      errors.push(`Step at index ${idx} must have at least one input.`);
    } else {
      step.inputs.forEach((inputId) => {
        if (!ingredientIds.has(inputId) && !stepIds.has(inputId)) {
          errors.push(
            `Step "${step.id}" input "${inputId}" must reference an ingredient or a previous step.`
          );
        }
      });
    }
    stepIds.add(step.id);
  });

  return { valid: errors.length === 0, errors };
}

export function validateRecipe(recipe: Recipe): ValidationResult {
  const errors: string[] = [];
  errors.push(...validateName(recipe.name).errors);
  errors.push(...validateRecipeId(recipe.recipeId).errors);
  errors.push(...validateIngredients(recipe.ingredients).errors);
  errors.push(...validateTags(recipe.tags).errors);
  errors.push(...validateSteps(recipe.steps, recipe.ingredients).errors);

  return { valid: errors.length === 0, errors };
}
