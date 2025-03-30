import { ChainableValidator } from "../../../src/pkg";

export default class ChainableMock extends ChainableValidator {
  protected async validateInternal(payload: any): Promise<string[]> {
    if (payload.valid) {
      return [];
    }
    return ["Invalid payload"];
  }
}
