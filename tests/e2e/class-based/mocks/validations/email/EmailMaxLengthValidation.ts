import { CreateValidation } from "../../../../../../src/pkg";

export const EmailMaxLengthValidation = CreateValidation((payload: any) => {
  const email = payload.email;
  if (email.length > 50) {
    return { valid: false, messages: ["Email is too long"] };
  } else {
    return { valid: true, messages: [] };
  }
});
