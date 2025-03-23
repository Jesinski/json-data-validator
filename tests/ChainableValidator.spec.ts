import assert from "assert";
import sinon from "sinon";
import { CompositeValidator } from "../src/validators/base/CompositeValidator";
import ChainableMock from "./mocks/ChainableMock";

describe("ChainableValidator", () => {
  it("should validate successfully when payload is valid", () => {
    const validator = new ChainableMock();
    const result = validator.validate({ valid: true });
    assert.deepStrictEqual(result, []);
  });

  it("should return errors when payload is invalid", () => {
    const validator = new ChainableMock();
    const result = validator.validate({ valid: false });
    assert.deepStrictEqual(result, ["Invalid payload"]);
  });

  it("should pass validation to the next validator in the chain", () => {
    const validator1 = new ChainableMock();
    const validator2 = new ChainableMock();
    const spy = sinon.spy(validator2, "validate");
    validator1.setNext(validator2);

    const result = validator1.validate({ valid: true });
    assert.deepStrictEqual(result, []);
    assert(spy.calledOnce, "validator2.validate should be called once");
  });

  it("should stop validation chain when an error is found", () => {
    const validator1 = new ChainableMock();
    const validator2 = new ChainableMock();
    validator1.setNext(validator2);

    const result = validator1.validate({ valid: false });
    assert.deepStrictEqual(result, ["Invalid payload"]);
  });

  it("should use CompositeValidator as the end of the chain", () => {
    class TestCompositeValidator extends CompositeValidator {
      validate(payload: any): string[] {
        if (payload.compositeValid) {
          return [];
        }
        return ["Composite validation failed"];
      }
    }

    const validator = new ChainableMock();
    const compositeValidator = new TestCompositeValidator();
    validator.endChain(compositeValidator);

    const result1 = validator.validate({ valid: true, compositeValid: true });
    assert.deepStrictEqual(result1, []);

    const result2 = validator.validate({ valid: true, compositeValid: false });
    assert.deepStrictEqual(result2, ["Composite validation failed"]);
  });
});
