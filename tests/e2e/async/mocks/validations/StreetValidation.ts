import { ChainableValidator } from "../../../../../src/pkg";
import { simulateAsyncCall } from "../simulateAsyncCall";

export class StreetValidation extends ChainableValidator {
  protected async validateInternal(payload: any): Promise<string[]> {
    await simulateAsyncCall();
    return payload.street ? [] : ["Street is required"];
  }
}
