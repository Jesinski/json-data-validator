import { CompositeValidator } from "../base/CompositeValidator";
import { AgeValidation } from "../validations/AgeValidation";
import { NameValidation } from "../validations/NameValidation";
import { EmailComposite } from "./EmailComposite";

export class ProfileComposite extends CompositeValidator {
  constructor() {
    super();
    this.add(new NameValidation());
    this.add(new AgeValidation());
    this.add(new EmailComposite());
  }
}
