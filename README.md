# JSON Data Validator

### Composable Validation Framework using Chain of Responsibility and Composite Patterns

[Blog post](https://jesinski.github.io/2025/06/14/json-data-validation.html) explaining the problem that originated this proof of concept, the solution and it's tradeoffs.

#### Create single, group or sequence of validations using the classes or functions below:

### OOP

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

### FP

```ts
export const Composite = (
  ...args: Array<(payload: any) => Promise<ValidationResult> | ValidationResult>
): ((payload: any) => Promise<ValidationResult> | ValidationResult) => {
  return async (payload: any): Promise<ValidationResult> => {
    const result = await Promise.all(args.map((fn) => fn(payload)));
    return {
      valid: result.every((res) => res.valid),
      messages: result.flatMap((res) => res.messages),
    };
  };
};

export function Sequence(
  ...args: Array<(payload: any) => Promise<ValidationResult> | ValidationResult>
): (payload: any) => Promise<ValidationResult> | ValidationResult {
  return async (payload: any): Promise<ValidationResult> => {
    const messages: string[] = [];
    for (const validator of args) {
      const result = await validator(payload);
      if (!result.valid) {
        return { valid: false, messages: [...messages, ...result.messages] };
      }
      messages.push(...result.messages);
    }

    return { valid: true, messages };
  };
}
```

#### For example:

```ts
export async function UserValidator(payload: any): Promise<ValidationResult> {
  const validator = Composite(
    Sequence(
      EmailShouldBeDefined,
      EmailHasDollarSign,
      EmailShouldHaveAtLeast5Characters
    ),
    NameShouldHaveAtLeast3Characters
  );

  return validator(payload);
}

function NameShouldHaveAtLeast3Characters(payload: any): ValidationResult {
  const name = payload.name;
  if (name.length < 3) {
    return { valid: false, messages: ["Name is too short"] };
  } else {
    return { valid: true, messages: [] };
  }
}

function EmailShouldHaveAtLeast5Characters(payload: any): ValidationResult {
  const email = payload.email;
  if (email.length < 5) {
    return {
      valid: false,
      messages: ["Email must be at least 5 characters long"],
    };
  } else {
    return { valid: true, messages: [] };
  }
}

async function EmailShouldBeDefined(payload: any): Promise<ValidationResult> {
  const email = payload.email;
  if (!email) {
    return { valid: false, messages: ["Email is required"] };
  } else {
    return { valid: true, messages: [] };
  }
}

function EmailHasDollarSign(payload: any): ValidationResult {
  const { email } = payload;

  if (email.includes("$")) {
    return { valid: true, messages: ["Email has $ symbol."] };
  }

  return { valid: true, messages: [] };
}
```

### Reference implementations

OOP and FP based validators implementations can be found at /tests/e2e.

### Remarks

- Lack of generics
- Validations must return a ValidationResult, but a implicit valid result could be the lack of ValidationResult.

### How to develop

1. Clone the repository
2. Run `npm install`
3. Run `npm tests` (or it's derivations)
