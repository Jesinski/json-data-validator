import { ValidationResult, Validator } from "../common/Interfaces";

export const Composite = (
  ...args: Array<Validator["validate"]>
): Validator["validate"] => {
  return async (payload: any): Promise<ValidationResult> => {
    const result = await Promise.all(args.map((fn) => fn(payload)));
    return {
      valid: result.every((res) => res.valid),
      messages: result.flatMap((res) => res.messages),
    };
  };
};
