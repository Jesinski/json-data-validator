import { ChainableValidator, Validator } from "./Validator";

export abstract class BaseValidator implements ChainableValidator {
  private nextValidator: Validator | null = null;

  setNext(validator: Validator): Validator {
    this.nextValidator = validator;
    return validator; // Allows method chaining
  }

  validate(payload: any): string[] {
    const errors = this.validateInternal(payload);
    if (errors.length > 0) {
      return errors; // Stop chain if errors exist
    }
    return this.nextValidator ? this.nextValidator.validate(payload) : [];
  }

  protected abstract validateInternal(payload: any): string[];
}
