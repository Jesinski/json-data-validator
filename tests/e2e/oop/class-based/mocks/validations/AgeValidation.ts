import {
  ChainableValidator,
  ValidationResult,
} from "../../../../../../src/pkg";

export class AgeValidation extends ChainableValidator {
  protected validateInternal(payload: any): ValidationResult {
    return payload.age && payload.age > 18
      ? { valid: true, messages: [] }
      : { valid: false, messages: ["Age must be over 18"] };
  }
}
