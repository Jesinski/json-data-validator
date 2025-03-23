import { ChainableValidator } from "../../src/validators/base/ChainableValidator";

export default class ChainableMock extends ChainableValidator {
  protected validateInternal(payload: any): string[] {
    if (payload.valid) {
      return [];
    }
    return ["Invalid payload"];
  }
}
