import { ChainableValidator, ValidationResult } from "../../../../../src/pkg";
import { simulateAsyncCall } from "../simulateAsyncCall";

export class StreetValidation extends ChainableValidator {
  protected async validateInternal(payload: any): Promise<ValidationResult> {
    await simulateAsyncCall();
    return payload.street
      ? { valid: true, messages: [] }
      : { valid: false, messages: ["Street is required"] };
  }
}
