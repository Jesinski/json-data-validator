export interface Validator {
  validate(payload: any): Promise<string[]>;
}
