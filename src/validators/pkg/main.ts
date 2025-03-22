import { ChainableValidator } from "../base/ChainableValidator";

export function CreateValidation(
  fn: (payload: any) => string[]
): ChainableValidator {
  return new (class extends ChainableValidator {
    protected validateInternal(payload: any): string[] {
      return fn(payload);
    }
  })();
}
