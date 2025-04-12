import {
  CreateChain,
  CreateComposite,
  CreateValidation,
} from "../../../../src/pkg";

export const userValidator = CreateComposite([
  CreateComposite([
    CreateValidation((payload: any) => {
      const name = payload.name;
      if (name.length < 3) {
        return { valid: false, messages: ["Name is too short"] };
      } else {
        return { valid: true, messages: [] };
      }
    }),
    CreateValidation((payload: any) => {
      const age = payload.age;
      if (age < 18) {
        return { valid: false, messages: ["Age must be over 18"] };
      } else {
        return { valid: true, messages: [] };
      }
    }),
    CreateChain([
      CreateValidation((payload: any) => {
        if (!payload.email) {
          return { valid: false, messages: ["Email is required"] };
        } else {
          return { valid: true, messages: [] };
        }
      }),
      CreateValidation((payload: any) => {
        const email = payload.email;
        if (email.length < 5) {
          return {
            valid: false,
            messages: ["Email must be at least 5 characters long"],
          };
        } else {
          return { valid: true, messages: [] };
        }
      }),
      CreateValidation((payload: any) => {
        const email = payload.email;
        if (email.length > 50) {
          return { valid: false, messages: ["Email is too long"] };
        } else {
          return { valid: true, messages: [] };
        }
      }),
      CreateComposite([
        CreateValidation((payload: any) => {
          if (!payload.email.includes("@")) {
            return { valid: false, messages: ["Email is missing @ sign"] };
          } else {
            return { valid: true, messages: [] };
          }
        }),
        CreateValidation((payload: any) => {
          if (!payload.email.includes(".")) {
            return { valid: false, messages: ["Email is missing domain"] };
          } else {
            return { valid: true, messages: [] };
          }
        }),
      ]),
    ]),
  ]),
  CreateChain([
    CreateValidation((payload: any) => {
      return payload.street
        ? { valid: true, messages: [] }
        : { valid: false, messages: ["Street is required"] };
    }),
    CreateValidation((payload: any) => {
      return /^\d{5}$/.test(payload.zipCode)
        ? { valid: true, messages: [] }
        : { valid: false, messages: ["Invalid zip code"] };
    }),
  ]),
]);

export const UserValidator = (payload: any) => {
  return userValidator.validate(payload);
};
