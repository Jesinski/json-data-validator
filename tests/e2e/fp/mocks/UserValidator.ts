import {
  ValidateChain,
  ValidateComposite,
  ValidationResult,
} from "../../../../src/pkg";

export async function UserValidator(payload: any): Promise<ValidationResult> {
  const validator = ValidateComposite(
    ValidateChain(
      EmailShouldBeDefined,
      EmailHasDollarSign,
      EmailShouldHaveAtLeast5Characters,
      AgeComposite,
      StreetChain()
    ),
    NameShouldHaveAtLeast3Characters
  );

  return validator(payload);
}

const AgeComposite = ValidateComposite(
  AgeShouldBeGreaterThan18,
  AgeShouldBeLessThan1000
);

function StreetChain(): (
  payload: any
) => Promise<ValidationResult> | ValidationResult {
  return ValidateChain(StreetShouldBeDefined, ZipcodeShouldBeDefined);
}

function StreetShouldBeDefined(payload: any): ValidationResult {
  if (!payload.street) {
    return { valid: false, messages: ["Street not defined"] };
  }
  return { valid: true, messages: [] };
}

function ZipcodeShouldBeDefined(payload: any): ValidationResult {
  if (!payload.zipCode) {
    return { valid: false, messages: ["ZipCode not defined"] };
  }
  return { valid: true, messages: [] };
}

function AgeShouldBeGreaterThan18(payload: any): ValidationResult {
  if (payload.age < 18) {
    return { valid: false, messages: ["Too young"] };
  }
  return { valid: true, messages: [] };
}

function AgeShouldBeLessThan1000(payload: any): ValidationResult {
  if (payload.age > 1000) {
    return { valid: false, messages: ["Too old"] };
  }
  return { valid: true, messages: [] };
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
