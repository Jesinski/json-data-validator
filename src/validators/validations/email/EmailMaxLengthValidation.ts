import { CreateValidation } from "../../pkg/main";

export const EmailMaxLengthValidation = CreateValidation((payload: any) => {
  const email = payload.email;
  if (email.length > 50) {
    return ["Email is too long"];
  } else {
    return [];
  }
});
