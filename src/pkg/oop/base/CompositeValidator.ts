import { ValidationResult, Validator } from "../../common/Interfaces";

export class CompositeValidator implements Validator {
  private validators: Validator[] = [];

  add(validator: Validator | Validator[]): this {
    this.validators.push(...[validator].flat());
    return this;
  }

  async validate(payload: any): Promise<ValidationResult> {
    const results = await Promise.all(
      this.validators.map((validator) => validator.validate(payload))
    );
    const valid = results.every((result) => result.valid);
    const messages = results.flatMap((result) => result.messages);
    return { valid, messages };
  }
}
