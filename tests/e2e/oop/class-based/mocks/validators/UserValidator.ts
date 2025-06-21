import { CompositeValidator } from "../../../../../../src/pkg";
import { AddressChain } from "../chains/AddressChain";
import { ProfileComposite } from "../composites/ProfileComposite";

export class UserValidator extends CompositeValidator {
  constructor() {
    super();
    this.add(new ProfileComposite());
    this.add(new AddressChain());
  }
}
