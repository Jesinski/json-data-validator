import { CreateValidation } from "../../../pkg";

export const EmailMaxLengthValidation = CreateValidation((payload: any) => {
  const email = payload.email;
  if (email.length > 50) {
    return ["Email is too long"];
  } else {
    return [];
  }
});
