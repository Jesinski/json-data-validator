export interface Validator {
  validate(payload: any): string[]; // Returns validation errors
}
