import { BaseValidator } from "../../base/BaseValidator";

export class EmailFormatValidation extends BaseValidator {
  protected validateInternal(payload: any): string[] {
    const email = payload.email;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return ["Email is not in valid format"];
    } else {
      return [];
    }
  }
}
