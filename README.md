# JSON Data Validator

### Composable Validation Framework using Chain of Responsibility and Composite Patterns

[Blog post](https://jesinski.github.io/2025/06/14/json-data-validation.html) explaining the problem that originated this proof of concept, the solution and it's tradeoffs.

#### Create single, group or sequence of validations using the classes below:

```ts
export abstract class ChainableValidator implements Validator {
  private nextValidator: Validator | null = null;

  setNext(validator: ChainableValidator): ChainableValidator {
    this.nextValidator = validator;
    return validator;
  }

  async validate(payload: any): Promise<ValidationResult> {
    const result = await this.validateInternal(payload);
    // Stop condition
    if (!result.valid) {
      return result;
    }
    return this.nextValidator ? this.nextValidator.validate(payload) : result;
  }

  endChain(composite: CompositeValidator): void {
    this.nextValidator = composite;
  }

  protected abstract validateInternal(
    payload: any
  ): Promise<ValidationResult> | ValidationResult;
}

export class CompositeValidator implements Validator {
  private validators: Validator[] = [];

  add(validator: Validator | Validator[]): this {
    this.validators.push(...[validator].flat());
    return this;
  }

  async validate(payload: any): Promise<ValidationResult> {
    const results = await Promise.all(
      this.validators.map((validator) => validator.validate(payload))
    );
    const valid = results.every((result) => result.valid);
    const messages = results.flatMap((result) => result.messages);
    return { valid, messages };
  }
}
```

#### For example:

```ts
class RecipeValidator extends CompositeValidator {
  constructor() {
    this.add(new RecipeIdChain());
    this.add(new TagsComposite());
  }
}

class RecipeChain extends ChainableValidator {
  constructor() {
    super();
    this.setNext(new RecipeIdMustBeDefined())
      .setNext(new RecipeIdMustBeUnique())
      .setNext(new RecipeIdMustHaveMaxLength())
      .setNext(new RecipeIdMustHaveAllowedOnlyAlphanumericChars());
  }
}

class TagsComposite extends CompositeValidator {
  constructor() {
    this.add(new TagIdValidation());
    this.add(new TagDescriptionValidation());
  }
}

class RecipeIdMustBeDefined extends ValidationResult {
  validateInternal(payload: any): ValidationResult {
    if (!payload.id) {
      return {
        valid: false,
        message: ["Invalid Recipe ID: ID must be defined"],
      };
    }

    return {
      valid: true,
      message: [],
    };
  }
}
```

### Reference implementations

Function based and class based validators implementations can be found at /tests/e2e.

### Remarks

- Lack of generics
- Validations must return a ValidationResult, but a implicit valid result could be the lack of ValidationResult.

### How to develop

1. Clone the repository
2. Run `npm install`
3. Run `npm tests` (or it's derivations)
