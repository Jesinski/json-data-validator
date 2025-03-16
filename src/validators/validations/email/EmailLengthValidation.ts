import { BaseValidator } from "../../base/BaseValidator";

export class EmailLengthValidation extends BaseValidator {
  protected validateInternal(payload: any): string[] {
    const email = payload.email;
    if (email.length < 5) {
      return ["Email must be at least 5 characters long"];
    } else {
      return [];
    }
  }
}
