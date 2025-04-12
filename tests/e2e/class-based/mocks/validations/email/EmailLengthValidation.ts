import {
  ChainableValidator,
  ValidationResult,
} from "../../../../../../src/pkg";

export class EmailLengthValidation extends ChainableValidator {
  protected validateInternal(payload: any): ValidationResult {
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
}
