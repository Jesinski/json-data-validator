import {
  ChainableValidator,
  ValidationResult,
} from "../../../../../../../src/pkg";

export class EmailFormatValidation extends ChainableValidator {
  protected validateInternal(payload: any): ValidationResult {
    const email = payload.email;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { valid: false, messages: ["Email is not in valid format"] };
    } else {
      return { valid: true, messages: [] };
    }
  }
}
