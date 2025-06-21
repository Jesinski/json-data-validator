import { CompositeValidator } from "../../../../../../src/pkg";
import { EmailChain } from "../chains/EmailChain";
import { AgeValidation } from "../validations/AgeValidation";
import { NameValidation } from "../validations/NameValidation";

export class ProfileComposite extends CompositeValidator {
  constructor() {
    super();
    const nameValidation = new NameValidation();
    const ageValidation = new AgeValidation();
    const emailChain = new EmailChain();

    this.add(nameValidation);
    this.add(ageValidation);
    this.add(emailChain);
  }
}
