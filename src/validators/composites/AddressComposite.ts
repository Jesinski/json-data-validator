import { CompositeValidator } from "../base/CompositeValidator";
import { StreetValidation } from "../validations/StreetValidation";
import { ZipCodeValidation } from "../validations/ZipCodeValidation";

export class AddressComposite extends CompositeValidator {
  constructor() {
    super();
    const streetValidator = new StreetValidation();
    const zipCodeValidator = new ZipCodeValidation();

    streetValidator.setNext(zipCodeValidator);
    this.add(streetValidator);
    this.add(zipCodeValidator);
  }
}
