import { ChainableValidator } from "../base/ChainableValidator";
import { CompositeValidator } from "../base/CompositeValidator";

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
