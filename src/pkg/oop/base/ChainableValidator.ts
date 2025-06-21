import { ValidationResult, Validator } from "../../common/Interfaces";
import { CompositeValidator } from "./CompositeValidator";

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
