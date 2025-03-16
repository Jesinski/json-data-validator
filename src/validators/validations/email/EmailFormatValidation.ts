import { BaseChainableValidator } from "../../base/BaseChainableValidator";

export class EmailFormatValidation extends BaseChainableValidator {
  protected validateInternal(payload: any): string[] {
    const email = payload.email;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return ["Email is not in valid format"];
    } else {
      return [];
    }
  }
}
