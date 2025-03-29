import { ChainableValidator } from "../../pkg/base/ChainableValidator";
import { StreetValidation } from "../validations/StreetValidation";
import { ZipCodeValidation } from "../validations/ZipCodeValidation";

export class StreetChain extends ChainableValidator {
  constructor() {
    super();
    this.setNext(new StreetValidation()).setNext(new ZipCodeValidation());
  }

  protected validateInternal(payload: any): string[] {
    return [];
  }
}
