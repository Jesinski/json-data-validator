import { ChainableValidator } from "./ChainableValidator";
import { Validator } from "./Validator";

export class CompositeValidator implements Validator {
  private validators: Validator[] = [];

  add<T extends ChainableValidator | Validator>(validator: T): T {
    this.validators.push(validator);
    return validator;
  }

  validate(payload: any): string[] {
    return this.validators.flatMap((validator) => validator.validate(payload));
  }
}
