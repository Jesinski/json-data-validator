import { Validator } from "./Validator";

export class CompositeValidator implements Validator {
  private validators: Validator[] = [];

  setNext(validator: Validator): Validator {
    throw new Error("Composite validators should not use setNext.");
  }

  add(validator: Validator): void {
    this.validators.push(validator);
  }

  validate(payload: any): string[] {
    return this.validators.flatMap((validator) => validator.validate(payload));
  }
}
