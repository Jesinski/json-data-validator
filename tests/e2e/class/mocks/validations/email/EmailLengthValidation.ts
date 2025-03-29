import { ChainableValidator } from "../../../../../../src/pkg";

export class EmailLengthValidation extends ChainableValidator {
  protected validateInternal(payload: any): string[] {
    const email = payload.email;
    if (email.length < 5) {
      return ["Email must be at least 5 characters long"];
    } else {
      return [];
    }
  }
}
