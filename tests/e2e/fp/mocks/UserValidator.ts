import {
  ValidateChain,
  ValidateComposite,
  ValidationResult,
} from "../../../../src/pkg";

export async function UserValidator(payload: any): Promise<ValidationResult> {
  return ValidateComposite(
    ValidateChain(
      EmailShouldBeDefined,
      EmailHasDollarSign,
      EmailShouldHaveAtLeast5Characters
    ),
    NameShouldHaveAtLeast3Characters
  )(payload);
}
// #region Name validators
function NameShouldHaveAtLeast3Characters(payload: any): ValidationResult {
  const name = payload.name;
  if (name.length < 3) {
    return { valid: false, messages: ["Name is too short"] };
  } else {
    return { valid: true, messages: [] };
  }
}
// #endregion

function EmailShouldHaveAtLeast5Characters(payload: any): ValidationResult {
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

async function EmailShouldBeDefined(payload: any): Promise<ValidationResult> {
  const email = payload.email;
  if (!email) {
    return { valid: false, messages: ["Email is required"] };
  } else {
    return { valid: true, messages: [] };
  }
}

function EmailHasDollarSign(payload: any): ValidationResult {
  const { email } = payload;

  if (email.includes("$")) {
    return { valid: true, messages: ["Email has $ symbol."] };
  }

  return { valid: true, messages: [] };
}
