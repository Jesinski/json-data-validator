import { ChainableValidator } from "../base/ChainableValidator";
import { EmailFormatComposite } from "../composites/EmailFormatComposite";
import { EmailIsRequiredValidation } from "../validations/email/EmailIsRequiredValidation";
import { EmailLengthValidation } from "../validations/email/EmailLengthValidation";

export class EmailChain extends ChainableValidator {
  constructor() {
    super();
    // Creates chainable validators
    const emailIsRequiredValidation = new EmailIsRequiredValidation();
    const emailLengthValidation = new EmailLengthValidation();
    const emailFormatComposite = new EmailFormatComposite();

    this.setNext(emailIsRequiredValidation)
      .setNext(emailLengthValidation)
      .endChain(emailFormatComposite);
  }
  protected validateInternal(payload: any): string[] {
    return [];
  }
}
