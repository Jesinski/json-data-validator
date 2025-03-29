import { ChainableValidator } from "../../../../../../src/pkg";

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
