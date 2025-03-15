export interface Validator {
  setNext(validator: Validator): Validator;
  validate(payload: any): string[]; // Returns validation errors
}
