import { BaseValidator } from "../base/BaseValidator";

export class NameValidation extends BaseValidator {
  protected validateInternal(payload: any): string[] {
    return payload.name && payload.name.length > 2 ? [] : ["Invalid name"];
  }
}
