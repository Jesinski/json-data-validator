import { ValidationResult } from "../base/Validator";

export const ValidateChain = (
  ...args: Array<(payload: any) => Promise<ValidationResult> | ValidationResult>
): ((payload: any) => Promise<ValidationResult> | ValidationResult) => {
  return async (payload: any): Promise<ValidationResult> => {
    const messages: string[] = [];

    for (const validator of args) {
      const result = await validator(payload);
      if (!result.valid) {
        return result;
      }
      messages.push(...result.messages);
    }

    return { valid: true, messages };
  };
};
