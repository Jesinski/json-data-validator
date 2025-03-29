import {
  CreateChain,
  CreateComposite,
  CreateValidation,
} from "../../../../src/pkg";

export const UserValidator = CreateComposite([
  CreateComposite([
    CreateValidation((payload: any) => {
      const name = payload.name;
      if (name.length < 3) {
        return ["Name is too short"];
      } else {
        return [];
      }
    }),
    CreateValidation((payload: any) => {
      const age = payload.age;
      if (age < 18) {
        return ["User is too young"];
      } else {
        return [];
      }
    }),
    CreateChain([
      CreateValidation((payload: any) => {
        if (!payload.email) {
          return ["Email is required"];
        } else {
          return [];
        }
      }),
      CreateValidation((payload: any) => {
        const email = payload.email;
        if (email.length < 5) {
          return ["Email must be at least 5 characters long"];
        } else {
          return [];
        }
      }),
      CreateValidation((payload: any) => {
        const email = payload.email;
        if (email.length > 50) {
          return ["Email is too long"];
        } else {
          return [];
        }
      }),
      CreateComposite([
        CreateValidation((payload: any) => {
          if (!payload.email.includes("@")) {
            return ["Email is missing @ sign"];
          } else {
            return [];
          }
        }),
        CreateValidation((payload: any) => {
          if (!payload.email.includes(".")) {
            return ["Email is missing domain"];
          } else {
            return [];
          }
        }),
      ]),
    ]),
  ]),
  CreateComposite([
    CreateChain([
      CreateValidation((payload: any) => {
        return payload.street ? [] : ["Street is required"];
      }),
      CreateValidation((payload: any) => {
        return /^\d{5}$/.test(payload.zipCode) ? [] : ["Invalid zip code"];
      }),
    ]),
    CreateValidation((payload: any) => {
      return /^\d{5}$/.test(payload.zipCode) ? [] : ["Invalid zip code"];
    }),
  ]),
]);
