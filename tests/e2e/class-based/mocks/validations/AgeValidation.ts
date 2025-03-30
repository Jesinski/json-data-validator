import { ChainableValidator } from "../../../../../src/pkg";

export class AgeValidation extends ChainableValidator {
  protected validateInternal(payload: any): string[] {
    return payload.age && payload.age > 18 ? [] : ["Age must be over 18"];
  }
}
