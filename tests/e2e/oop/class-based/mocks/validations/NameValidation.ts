import {
  ChainableValidator,
  ValidationResult,
} from "../../../../../../src/pkg";

export class NameValidation extends ChainableValidator {
  protected validateInternal(payload: any): ValidationResult {
    return payload.name && payload.name.length > 2
      ? { valid: true, messages: [] }
      : { valid: false, messages: ["Name is too short"] };
  }
}
