import { CompositeValidator } from "../base/CompositeValidator";
import { EmailFormatValidation } from "../validations/email/EmailFormatValidation";
import { EmailIsRequiredValidation } from "../validations/email/EmailIsRequiredValidation";
import { EmailLengthValidation } from "../validations/email/EmailLengthValidation";

export class EmailComposite extends CompositeValidator {
  constructor() {
    super();
    const emailIsRequiredValidation = new EmailIsRequiredValidation();
    const emailLengthValidation = new EmailLengthValidation();
    const emailFormatValidation = new EmailFormatValidation();

    // Defines chain of responsibility
    emailIsRequiredValidation.setNext(emailLengthValidation);
    emailLengthValidation.setNext(emailFormatValidation);

    // Defines entry point of the chain
    this.add(emailIsRequiredValidation);
  }
}
