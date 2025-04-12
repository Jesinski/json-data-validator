import { ChainableValidator, ValidationResult } from "../../../../../src/pkg";
import { StreetValidation } from "../validations/StreetValidation";
import { ZipCodeValidation } from "../validations/ZipCodeValidation";

export class AddressChain extends ChainableValidator {
  constructor() {
    super();
    this.setNext(new StreetValidation()).setNext(new ZipCodeValidation());
  }

  protected validateInternal(payload: any): ValidationResult {
    return { valid: true, messages: [] };
  }
}
