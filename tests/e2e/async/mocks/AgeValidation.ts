import { ChainableValidator } from "../../../../src/pkg";
import { simulateAsyncCall } from "./simulateAsyncCall";

export class AgeValidation extends ChainableValidator {
  protected async validateInternal(payload: any): Promise<string[]> {
    await simulateAsyncCall();
    return payload.age && payload.age > 18 ? [] : ["Age must be over 18"];
  }
}
