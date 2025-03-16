import { ChainableValidator } from "../../base/ChainableValidator";

export class EmailIsRequiredValidation extends ChainableValidator {
  protected validateInternal(payload: any): string[] {
    const email = payload.email;
    if (!email) {
      return ["Email is required"];
    } else {
      return [];
    }
  }
}
