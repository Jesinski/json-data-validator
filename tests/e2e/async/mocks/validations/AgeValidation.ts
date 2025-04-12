import { ChainableValidator, ValidationResult } from "../../../../../src/pkg";
import { simulateAsyncCall } from "../simulateAsyncCall";

export class AgeValidation extends ChainableValidator {
  protected async validateInternal(payload: any): Promise<ValidationResult> {
    await simulateAsyncCall();
    return payload.age && payload.age > 18
      ? { valid: true, messages: [] }
      : { valid: false, messages: ["Age must be over 18"] };
  }
}
