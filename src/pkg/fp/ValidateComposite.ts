import { ValidationResult } from "../base/Validator";

export const ValidateComposite = (
  ...args: Array<(payload: any) => Promise<ValidationResult> | ValidationResult>
): ((payload: any) => Promise<ValidationResult> | ValidationResult) => {
  return async (payload: any): Promise<ValidationResult> => {
    const messages: string[] = [];
    let valid = true;

    for (const validator of args) {
      // todo: implement like CompositeValidator.ts to flex some JS knowledge
      const result = await validator(payload);
      messages.push(...result.messages);
      valid = valid && result.valid;
    }

    return { valid, messages };
  };
};
