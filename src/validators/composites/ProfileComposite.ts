import { CompositeValidator } from "../base/CompositeValidator";
import { AgeValidation } from "../validations/AgeValidation";
import { NameValidation } from "../validations/NameValidation";

export class ProfileComposite extends CompositeValidator {
  constructor() {
    super();
    const nameValidator = new NameValidation();
    const ageValidator = new AgeValidation();

    nameValidator.setNext(ageValidator);
    this.add(nameValidator);
  }
}
