import { Validator } from "../../../src/pkg";

export default class CompositeMock implements Validator {
  private returnErrors: string[];

  constructor(returnErrors: string[]) {
    this.returnErrors = returnErrors;
  }

  async validate(payload: any): Promise<string[]> {
    return this.returnErrors;
  }
}
