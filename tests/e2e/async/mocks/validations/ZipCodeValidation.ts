import { ChainableValidator } from "../../../../../src/pkg";

export class ZipCodeValidation extends ChainableValidator {
  protected validateInternal(payload: any): string[] {
    return /^\d{5}$/.test(payload.zipCode) ? [] : ["Invalid zip code"];
  }
}
