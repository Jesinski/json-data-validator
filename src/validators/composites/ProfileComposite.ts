import { CompositeValidator } from "../base/CompositeValidator";
import { AgeValidation } from "../validations/AgeValidation";
import { EmailValidation } from "../validations/EmailValidation";
import { NameValidation } from "../validations/NameValidation";

export class ProfileComposite extends CompositeValidator {
  constructor() {
    super();
    const nameValidator = new NameValidation();
    const ageValidator = new AgeValidation();
    const emailValidator = new EmailValidation();

    nameValidator.setNext(ageValidator);
    ageValidator.setNext(emailValidator);
    this.add(nameValidator);
  }
}
