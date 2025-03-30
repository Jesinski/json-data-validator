import { ChainableValidator } from "../../../../../../src/pkg";

export class EmailHasDomainValidation extends ChainableValidator {
  protected async validateInternal(payload: any): Promise<string[]> {
    const email = payload.email;
    if (!email.includes(".")) {
      return ["Email is missing domain"];
    } else {
      return [];
    }
  }
}
