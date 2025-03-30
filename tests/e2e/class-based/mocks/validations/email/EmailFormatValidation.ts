import { ChainableValidator } from "../../../../../../src/pkg";

export class EmailFormatValidation extends ChainableValidator {
  protected async validateInternal(payload: any): Promise<string[]> {
    const email = payload.email;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return ["Email is not in valid format"];
    } else {
      return [];
    }
  }
}
