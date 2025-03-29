import { ChainableValidator } from "../../../../../../src/pkg";

export class EmailHasAtSignValidation extends ChainableValidator {
  protected validateInternal(payload: any): string[] {
    const email = payload.email;
    if (!email.includes("@")) {
      return ["Email is missing @ sign"];
    } else {
      return [];
    }
  }
}
