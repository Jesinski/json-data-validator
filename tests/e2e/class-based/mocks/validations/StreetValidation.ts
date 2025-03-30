import { ChainableValidator } from "../../../../../src/pkg";

export class StreetValidation extends ChainableValidator {
  protected async validateInternal(payload: any): Promise<string[]> {
    return payload.street ? [] : ["Street is required"];
  }
}
