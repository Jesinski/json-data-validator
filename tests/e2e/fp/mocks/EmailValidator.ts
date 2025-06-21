import { ValidateChain, ValidationResult } from "../../../../src/pkg";

export async function EmailValidator(payload: any): Promise<ValidationResult> {
  return ValidateChain(
    EmailShouldBeDefined,
    EmailShouldHaveAtLeast5Characters
  )(payload);
}

export function EmailShouldHaveAtLeast5Characters(
  payload: any
): ValidationResult {
  const email = payload.email;
  if (email.length < 5) {
    return {
      valid: false,
      messages: ["Email must be at least 5 characters long"],
    };
  } else {
    return { valid: true, messages: [] };
  }
}

export const EmailShouldBeDefined = (
  payload: any
): Promise<ValidationResult> | ValidationResult => {
  const email = payload.email;
  if (!email) {
    return { valid: false, messages: ["Email is required"] };
  } else {
    return { valid: true, messages: [] };
  }
};
