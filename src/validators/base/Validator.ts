export interface Validator {
  validate(payload: any): string[];
}
