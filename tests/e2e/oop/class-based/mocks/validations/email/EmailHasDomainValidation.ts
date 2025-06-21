import {
  ChainableValidator,
  ValidationResult,
} from "../../../../../../../src/pkg";

export class EmailHasDomainValidation extends ChainableValidator {
  protected validateInternal(payload: any): ValidationResult {
    const email = payload.email;
    if (!email.includes(".")) {
      return { valid: false, messages: ["Email is missing domain"] };
    } else {
      return { valid: true, messages: [] };
    }
  }
}
