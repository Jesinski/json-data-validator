import { BaseChainableValidator } from "../base/BaseChainableValidator";

export class AgeValidation extends BaseChainableValidator {
  protected validateInternal(payload: any): string[] {
    return payload.age && payload.age > 18 ? [] : ["Age must be over 18"];
  }
}
