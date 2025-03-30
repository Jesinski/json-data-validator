import { ChainableValidator } from "../base/ChainableValidator";

export function CreateValidation(
  fn: (payload: any) => Promise<string[]> | string[]
): ChainableValidator {
  return new (class extends ChainableValidator {
    protected async validateInternal(payload: any): Promise<string[]> {
      return fn(payload);
    }
  })();
}
