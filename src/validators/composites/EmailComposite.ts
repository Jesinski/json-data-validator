import { CompositeValidator } from "../base/CompositeValidator";
import { EmailFormatValidation } from "../validations/email/EmailFormatValidation";
import { EmailIsRequiredValidation } from "../validations/email/EmailIsRequiredValidation";
import { EmailLengthValidation } from "../validations/email/EmailLengthValidation";
import { EmailMaxLengthValidation } from "../validations/email/EmailMaxLengthValidation";
import { EmailFormatComposite } from "./EmailFormatComposite";

export class EmailComposite extends CompositeValidator {
  constructor() {
    super();
    // Creates chainable validators
    const emailIsRequiredValidation = new EmailIsRequiredValidation();
    const emailLengthValidation = new EmailLengthValidation();
    const emailFormatComposite = new EmailFormatComposite();

    // Defines chain of responsibility
    emailIsRequiredValidation
      .setNext(emailLengthValidation)
      .setNext(emailFormatComposite)
      .add(new EmailFormatValidation())
      .setNext(new EmailMaxLengthValidation());

    this.add(emailIsRequiredValidation);
  }
}
