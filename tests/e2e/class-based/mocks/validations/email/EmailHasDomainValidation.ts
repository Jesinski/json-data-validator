import { ChainableValidator } from "../../../../../../src/pkg";

export class EmailHasDomainValidation extends ChainableValidator {
  protected validateInternal(payload: any): string[] {
    const email = payload.email;
    if (!email.includes(".")) {
      return ["Email is missing domain"];
    } else {
      return [];
    }
  }
}
