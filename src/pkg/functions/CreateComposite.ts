import { ChainableValidator } from "../oop/base/ChainableValidator";
import { CompositeValidator } from "../oop/base/CompositeValidator";

export function CreateComposite(
  validators: Array<ChainableValidator | CompositeValidator>
): CompositeValidator {
  return new (class extends CompositeValidator {
    constructor() {
      super();
      for (const validator of validators) {
        this.add(validator);
      }
    }
  })();
}
