import { ChainableValidator, ValidationResult } from "../../../src/pkg";

export default class ChainableMock extends ChainableValidator {
  protected validateInternal(payload: any): ValidationResult {
    if (payload.valid) {
      return { valid: true, messages: [] };
    }
    return { valid: false, messages: ["Invalid payload"] };
  }
}
