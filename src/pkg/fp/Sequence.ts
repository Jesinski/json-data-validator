import { ValidationResult } from "../common/Interfaces";

export function Sequence(
  ...args: Array<(payload: any) => Promise<ValidationResult> | ValidationResult>
): (payload: any) => Promise<ValidationResult> | ValidationResult {
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
