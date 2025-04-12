import {
  ChainableValidator,
  ValidationResult,
} from "../../../../../../src/pkg";

export class EmailIsRequiredValidation extends ChainableValidator {
  protected validateInternal(payload: any): ValidationResult {
    const email = payload.email;
    if (!email) {
      return { valid: false, messages: ["Email is required"] };
    } else {
      return { valid: true, messages: [] };
    }
  }
}
