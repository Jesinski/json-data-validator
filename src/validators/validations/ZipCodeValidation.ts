import { ChainableValidator } from "../../pkg/base/ChainableValidator";

export class ZipCodeValidation extends ChainableValidator {
  protected validateInternal(payload: any): string[] {
    return /^\d{5}$/.test(payload.zipCode) ? [] : ["Invalid zip code"];
  }
}
