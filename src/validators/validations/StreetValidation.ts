import { BaseValidator } from "../base/BaseValidator";

export class StreetValidation extends BaseValidator {
  protected validateInternal(payload: any): string[] {
    return payload.street ? [] : ["Street is required"];
  }
}
