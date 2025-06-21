import { ChainableValidator } from "../base/ChainableValidator";
import { CompositeValidator } from "../base/CompositeValidator";

export function CreateChain(
  validators:
    | [ChainableValidator, ...ChainableValidator[], CompositeValidator]
    | [ChainableValidator, ...ChainableValidator[]]
): ChainableValidator {
  const rootValidator = validators[0];

  for (let i = 0; i < validators.length - 1; i++) {
    const currentValidator = validators[i];
    const nextValidator = validators[i + 1];
    if (
      isChainableValidator(currentValidator) &&
      isChainableValidator(nextValidator)
    ) {
      currentValidator.setNext(nextValidator);
    }

    if (
      isChainableValidator(currentValidator) &&
      isCompositeValidator(nextValidator)
    ) {
      currentValidator.endChain(nextValidator);
    }
  }

  return rootValidator;
}

function isCompositeValidator(
  validator: ChainableValidator | CompositeValidator
): validator is CompositeValidator {
  return validator instanceof CompositeValidator;
}

function isChainableValidator(
  validator: ChainableValidator | CompositeValidator
): validator is ChainableValidator {
  return validator instanceof ChainableValidator;
}
