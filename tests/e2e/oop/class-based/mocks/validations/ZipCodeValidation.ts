import {
  ChainableValidator,
  ValidationResult,
} from "../../../../../../src/pkg";

export class ZipCodeValidation extends ChainableValidator {
  protected validateInternal(payload: any): ValidationResult {
    return /^\d{5}$/.test(payload.zipCode)
      ? { valid: true, messages: [] }
      : { valid: false, messages: ["Invalid zip code"] };
  }
}
