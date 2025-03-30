import { ChainableValidator } from "../../../../../src/pkg";

export class NameValidation extends ChainableValidator {
  protected async validateInternal(payload: any): Promise<string[]> {
    return payload.name && payload.name.length > 2 ? [] : ["Name is too short"];
  }
}
