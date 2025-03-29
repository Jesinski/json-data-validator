import { ChainableValidator } from "../../pkg/base/ChainableValidator";
import { EmailFormatComposite } from "../composites/EmailFormatComposite";
import { EmailIsRequiredValidation } from "../validations/email/EmailIsRequiredValidation";
import { EmailLengthValidation } from "../validations/email/EmailLengthValidation";
import { EmailMaxLengthValidation } from "../validations/email/EmailMaxLengthValidation";

export class EmailChain extends ChainableValidator {
  constructor() {
    super();
    // Creates chainable validators
    const emailIsRequiredValidation = new EmailIsRequiredValidation();
    const emailLengthValidation = new EmailLengthValidation();
    const emailFormatComposite = new EmailFormatComposite();

    this.setNext(emailIsRequiredValidation)
      .setNext(emailLengthValidation)
      .setNext(EmailMaxLengthValidation)
      .endChain(emailFormatComposite);
  }
  protected validateInternal(payload: any): string[] {
    return [];
  }
}
