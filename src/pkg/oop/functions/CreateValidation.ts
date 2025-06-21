import { ValidationResult } from "../..";
import { ChainableValidator } from "../base/ChainableValidator";

export function CreateValidation(
  fn: (payload: any) => Promise<ValidationResult> | ValidationResult
): ChainableValidator {
  return new (class extends ChainableValidator {
    protected async validateInternal(payload: any): Promise<ValidationResult> {
      return fn(payload);
    }
  })();
}
