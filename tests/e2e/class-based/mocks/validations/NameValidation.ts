import { ChainableValidator } from "../../../../../src/pkg";

export class NameValidation extends ChainableValidator {
  protected validateInternal(payload: any): string[] {
    return payload.name && payload.name.length > 2 ? [] : ["Invalid name"];
  }
}
