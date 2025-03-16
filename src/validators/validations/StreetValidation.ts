import { BaseChainableValidator } from "../base/BaseChainableValidator";

export class StreetValidation extends BaseChainableValidator {
  protected validateInternal(payload: any): string[] {
    return payload.street ? [] : ["Street is required"];
  }
}
