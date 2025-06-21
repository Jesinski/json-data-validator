import {
  ChainableValidator,
  ValidationResult,
} from "../../../../../../src/pkg";

export class StreetValidation extends ChainableValidator {
  protected validateInternal(payload: any): ValidationResult {
    return payload.street
      ? { valid: true, messages: [] }
      : { valid: false, messages: ["Street is required"] };
  }
}
