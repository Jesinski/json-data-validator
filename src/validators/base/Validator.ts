export interface Validator {
  validate(payload: any): string[]; // Returns validation errors
}

export interface ChainableValidator extends Validator {
  setNext(validator: Validator): Validator;
}
