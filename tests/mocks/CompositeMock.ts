import { Validator } from "../validators/base/Validator";

export default class CompositeMock implements Validator {
  private returnErrors: string[];

  constructor(returnErrors: string[]) {
    this.returnErrors = returnErrors;
  }

  validate(payload: any): string[] {
    return this.returnErrors;
  }
}
