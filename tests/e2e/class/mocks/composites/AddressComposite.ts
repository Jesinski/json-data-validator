import { CompositeValidator } from "../../../../../src/pkg";
import { StreetChain } from "../chains/StreetChain";
import { ZipCodeValidation } from "../validations/ZipCodeValidation";

export class AddressComposite extends CompositeValidator {
  constructor() {
    super();
    const streetChain = new StreetChain();
    const zipCodeValidator = new ZipCodeValidation();

    // The abstraction hinders the ability to see duplicated validations

    // StreetChain is StreetValidation -> ZipCodeValidation
    this.add(streetChain);
    // We mistakenly add zipCodeValidator to the composition
    this.add(zipCodeValidator);
    // This will cause the zipCodeValidator to be executed twice
  }
}
