import { ChainableValidator } from "../base/ChainableValidator";
import { ValidationResult } from "../base/Validator";

export function CreateValidation(
  fn: (payload: any) => Promise<ValidationResult> | ValidationResult
): ChainableValidator {
  return new (class extends ChainableValidator {
    protected async validateInternal(payload: any): Promise<ValidationResult> {
      return fn(payload);
    }
  })();
}
