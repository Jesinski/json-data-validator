import { ValidationResult, Validator } from "../common/Interfaces";

export function Sequence(
  ...args: Array<Validator["validate"]>
): Validator["validate"] {
  return async (payload: any): Promise<ValidationResult> => {
    const messages: string[] = [];
    for (const validator of args) {
      const result = await validator(payload);
      if (!result.valid) {
        return { valid: false, messages: [...messages, ...result.messages] };
      }
      messages.push(...result.messages);
    }

    return { valid: true, messages };
  };
}
