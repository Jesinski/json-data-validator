import { ChainableValidator } from "../../../../../src/pkg";

export class StreetValidation extends ChainableValidator {
  protected validateInternal(payload: any): string[] {
    return payload.street ? [] : ["Street is required"];
  }
}
