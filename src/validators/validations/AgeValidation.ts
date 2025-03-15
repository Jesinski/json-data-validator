import { BaseValidator } from "../base/BaseValidator";

export class AgeValidation extends BaseValidator {
  protected validateInternal(payload: any): string[] {
    return payload.age && payload.age > 18 ? [] : ["Age must be over 18"];
  }
}
