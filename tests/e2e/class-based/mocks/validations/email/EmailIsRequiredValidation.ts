import { ChainableValidator } from "../../../../../../src/pkg";

export class EmailIsRequiredValidation extends ChainableValidator {
  protected async validateInternal(payload: any): Promise<string[]> {
    const email = payload.email;
    if (!email) {
      return ["Email is required"];
    } else {
      return [];
    }
  }
}
