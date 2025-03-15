import { BaseValidator } from "../base/BaseValidator";

export class ZipCodeValidation extends BaseValidator {
  protected validateInternal(payload: any): string[] {
    return /^\d{5}$/.test(payload.zipCode) ? [] : ["Invalid zip code"];
  }
}
