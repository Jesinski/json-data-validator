import { CompositeValidator } from "../base/CompositeValidator";
import { AgeValidation } from "../validations/AgeValidation";
import { NameValidation } from "../validations/NameValidation";
import { EmailComposite } from "./EmailComposite";

export class ProfileComposite extends CompositeValidator {
  constructor() {
    super();
    const nameValidator = new NameValidation();
    const ageValidator = new AgeValidation();
    const emailValidator = new EmailComposite();

    nameValidator.setNext(ageValidator);
    ageValidator.setNext(emailValidator);
    this.add(nameValidator);
  }
}
