import { CompositeValidator } from "./CompositeValidator";
import { Validator } from "./Validator";

export abstract class ChainableValidator implements Validator {
  private nextValidator: Validator | null = null;

  setNext(validator: ChainableValidator): ChainableValidator {
    this.nextValidator = validator;
    return validator;
  }

  validate(payload: any): string[] {
    const errors = this.validateInternal(payload);
    // Stop condition
    if (errors.length > 0) {
      return errors;
    }
    return this.nextValidator ? this.nextValidator.validate(payload) : [];
  }

  endChain(composite: CompositeValidator): void {
    this.nextValidator = composite;
  }
  protected abstract validateInternal(payload: any): string[];
}
