import {
  CreateChain,
  CreateComposite,
  CreateValidation,
} from "../../../../src/pkg";
import { AgeValidation } from "./AgeValidation";
import { simulateAsyncCall } from "./simulateAsyncCall";

export const asyncValidator = CreateComposite([
  CreateComposite([
    new AgeValidation(),
    CreateChain([
      CreateValidation(async (payload: any) => {
        await simulateAsyncCall();
        if (!payload.email) {
          return ["Email is required"];
        } else {
          return [];
        }
      }),
      CreateValidation(async (payload: any) => {
        await simulateAsyncCall();
        const email = payload.email;
        if (email.length < 5) {
          return ["Email must be at least 5 characters long"];
        } else {
          return [];
        }
      }),
    ]),
  ]),
  CreateChain([
    CreateValidation(async (payload: any) => {
      await simulateAsyncCall();
      return payload.street ? [] : ["Street is required"];
    }),
    CreateValidation(async (payload: any) => {
      await simulateAsyncCall();
      return /^\d{5}$/.test(payload.zipCode) ? [] : ["Invalid zip code"];
    }),
  ]),
]);

export const AsyncValidator = async (payload: any) => {
  return await asyncValidator.validate(payload);
};
