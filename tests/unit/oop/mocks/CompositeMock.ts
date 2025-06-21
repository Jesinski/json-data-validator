import { ValidationResult, Validator } from "../../../../src/pkg";

export default class CompositeMock implements Validator {
  private returnErrors: ValidationResult;

  constructor(returnErrors: ValidationResult) {
    this.returnErrors = returnErrors;
  }

  validate(payload: any): ValidationResult {
    return this.returnErrors;
  }
}
