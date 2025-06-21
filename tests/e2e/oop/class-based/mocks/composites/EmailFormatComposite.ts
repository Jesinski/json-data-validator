import { CompositeValidator } from "../../../../../../src/pkg";
import { EmailHasAtSignValidation } from "../validations/email/EmailHasAtSignValidation";
import { EmailHasDomainValidation } from "../validations/email/EmailHasDomainValidation";

export class EmailFormatComposite extends CompositeValidator {
  constructor() {
    super();
    this.add([new EmailHasAtSignValidation(), new EmailHasDomainValidation()]);
  }
}
