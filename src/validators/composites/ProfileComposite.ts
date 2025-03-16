import { CompositeValidator } from "../base/CompositeValidator";
import { AgeValidation } from "../validations/AgeValidation";
import { NameValidation } from "../validations/NameValidation";
import { EmailComposite } from "./EmailComposite";

export class ProfileComposite extends CompositeValidator {
  constructor() {
    super();
    const nameValidation = new NameValidation();
    const ageValidation = new AgeValidation();
    const emailComposite = new EmailComposite();

    this.add(nameValidation);
    this.add(ageValidation);
    this.add(emailComposite);
  }
}
