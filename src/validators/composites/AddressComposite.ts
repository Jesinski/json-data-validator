import { CompositeValidator } from "../base/CompositeValidator";
import { StreetValidation } from "../validations/StreetValidation";
import { ZipCodeValidation } from "../validations/ZipCodeValidation";

export class AddressComposite extends CompositeValidator {
  constructor() {
    super();
    const streetValidator = new StreetValidation();
    const zipCodeValidator = new ZipCodeValidation();

    // Here's a situation:
    // We chained zipCodeValidator to streetValidator
    streetValidator.setNext(zipCodeValidator);
    this.add(streetValidator);
    // Then we add zipCodeValidator to the composition
    this.add(zipCodeValidator);
    // This will cause the zipCodeValidator to be executed twice
  }
}
