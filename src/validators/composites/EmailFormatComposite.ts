import { CompositeValidator } from "../base/CompositeValidator";
import { EmailHasAtSignValidation } from "../validations/email/EmailHasAtSignValidation";
import { EmailHasDomainValidation } from "../validations/email/EmailHasDomainValidation";

export class EmailFormatComposite extends CompositeValidator {
  constructor() {
    super();
    this.add([new EmailHasAtSignValidation(), new EmailHasDomainValidation()]);
  }
}
