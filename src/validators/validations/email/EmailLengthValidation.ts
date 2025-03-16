import { BaseChainableValidator } from "../../base/BaseChainableValidator";

export class EmailLengthValidation extends BaseChainableValidator {
  protected validateInternal(payload: any): string[] {
    const email = payload.email;
    if (email.length < 5) {
      return ["Email must be at least 5 characters long"];
    } else {
      return [];
    }
  }
}
