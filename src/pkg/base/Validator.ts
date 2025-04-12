export interface ValidationResult {
  valid: boolean;
  messages: string[];
}

export interface Validator {
  validate(payload: any): Promise<ValidationResult> | ValidationResult;
}
