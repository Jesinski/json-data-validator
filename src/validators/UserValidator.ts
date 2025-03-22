import { CompositeValidator } from "./base/CompositeValidator";
import { AddressComposite } from "./composites/AddressComposite";
import { ProfileComposite } from "./composites/ProfileComposite";

export class UserValidator extends CompositeValidator {
  constructor() {
    super();
    this.add(new ProfileComposite());
    this.add(new AddressComposite());
  }
}
