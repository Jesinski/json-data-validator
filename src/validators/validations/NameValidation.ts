import { BaseChainableValidator } from "../base/BaseChainableValidator";

export class NameValidation extends BaseChainableValidator {
  protected validateInternal(payload: any): string[] {
    return payload.name && payload.name.length > 2 ? [] : ["Invalid name"];
  }
}
