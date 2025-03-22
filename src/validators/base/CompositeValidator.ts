import { Validator } from "./Validator";

export class CompositeValidator implements Validator {
  private validators: Validator[] = [];

  add(validator: Validator | Validator[]): this {
    this.validators.push(...[validator].flat());
    return this;
  }

  validate(payload: any): string[] {
    return this.validators.flatMap((validator) => validator.validate(payload));
  }
}
