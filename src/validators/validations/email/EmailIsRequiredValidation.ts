import { BaseValidator } from "../../base/BaseValidator";

export class EmailIsRequiredValidation extends BaseValidator {
  protected validateInternal(payload: any): string[] {
    const email = payload.email;
    if (!email) {
      return ["Email is required"];
    } else {
      return [];
    }
  }
}
