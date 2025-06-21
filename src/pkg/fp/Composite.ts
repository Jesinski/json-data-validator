import { ValidationResult } from "../common/Interfaces";

export const Composite = (
  ...args: Array<(payload: any) => Promise<ValidationResult> | ValidationResult>
): ((payload: any) => Promise<ValidationResult> | ValidationResult) => {
  return async (payload: any): Promise<ValidationResult> => {
    const result = await Promise.all(args.map((fn) => fn(payload)));
    return {
      valid: result.every((res) => res.valid),
      messages: result.flatMap((res) => res.messages),
    };
  };
};
