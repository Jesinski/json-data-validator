import { ChainableValidator } from "../../base/ChainableValidator";

export class EmailMaxLengthValidation extends ChainableValidator {
  protected validateInternal(payload: any): string[] {
    const email = payload.email;
    if (email.length > 50) {
      return ["Email is too long"];
    } else {
      return [];
    }
  }
}
