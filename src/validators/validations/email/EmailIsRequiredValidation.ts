import { BaseChainableValidator } from "../../base/BaseChainableValidator";

export class EmailIsRequiredValidation extends BaseChainableValidator {
  protected validateInternal(payload: any): string[] {
    const email = payload.email;
    if (!email) {
      return ["Email is required"];
    } else {
      return [];
    }
  }
}
