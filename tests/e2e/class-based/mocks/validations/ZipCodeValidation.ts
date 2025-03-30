import { ChainableValidator } from "../../../../../src/pkg";

export class ZipCodeValidation extends ChainableValidator {
  protected async validateInternal(payload: any): Promise<string[]> {
    return /^\d{5}$/.test(payload.zipCode) ? [] : ["Invalid zip code"];
  }
}
