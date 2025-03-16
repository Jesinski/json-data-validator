import { ChainableValidator } from "../base/ChainableValidator";

export class NameValidation extends ChainableValidator {
  protected validateInternal(payload: any): string[] {
    return payload.name && payload.name.length > 2 ? [] : ["Invalid name"];
  }
}
