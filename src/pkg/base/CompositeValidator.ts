import { Validator } from "./Validator";

export class CompositeValidator implements Validator {
  private validators: Validator[] = [];

  add(validator: Validator | Validator[]): this {
    this.validators.push(...[validator].flat());
    return this;
  }

  async validate(payload: any): Promise<string[]> {
    const results = await Promise.all(
      this.validators.map((validator) => validator.validate(payload))
    );
    return results.flat();
  }
}
