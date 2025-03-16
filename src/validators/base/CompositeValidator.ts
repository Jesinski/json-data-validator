import { Validator } from "./Validator";

export class CompositeValidator implements Validator {
  private validators: Validator[] = [];

  add(validator: Validator): void {
    this.validators.push(validator);
  }

  validate(payload: any): string[] {
    return this.validators.flatMap((validator) => validator.validate(payload));
  }
}
