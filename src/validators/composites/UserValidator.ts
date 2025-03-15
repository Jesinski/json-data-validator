import { CompositeValidator } from "../base/CompositeValidator";
import { AddressComposite } from "./AddressComposite";
import { ProfileComposite } from "./ProfileComposite";

export class UserValidator extends CompositeValidator {
  constructor() {
    super();
    this.add(new ProfileComposite());
    this.add(new AddressComposite());
  }
}
