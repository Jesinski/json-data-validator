import { BaseChainableValidator } from "../base/BaseChainableValidator";

export class ZipCodeValidation extends BaseChainableValidator {
  protected validateInternal(payload: any): string[] {
    return /^\d{5}$/.test(payload.zipCode) ? [] : ["Invalid zip code"];
  }
}
