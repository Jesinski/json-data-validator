import assert from "assert";
import sinon from "sinon";
import { CompositeValidator, ValidationResult } from "../../src/pkg";
import ChainableMock from "./mocks/ChainableMock";

describe("ChainableValidator", () => {
  it("should validate successfully when payload is valid", async () => {
    const validator = new ChainableMock();
    const result = await validator.validate({ valid: true });
    assert.deepStrictEqual(result, { valid: true, messages: [] });
  });

  it("should return errors when payload is invalid", async () => {
    const validator = new ChainableMock();
    const result = await validator.validate({ valid: false });
    assert.deepStrictEqual(result, {
      valid: false,
      messages: ["Invalid payload"],
    });
  });

  it("should pass validation to the next validator in the chain", async () => {
    const validator1 = new ChainableMock();
    const validator2 = new ChainableMock();
    const spy = sinon.spy(validator2, "validate");
    validator1.setNext(validator2);

    const result = await validator1.validate({ valid: true });
    assert.deepStrictEqual(result, { valid: true, messages: [] });
    assert(spy.calledOnce, "validator2.validate should be called once");
  });

  it("should stop validation chain when an error is found", async () => {
    const validator1 = new ChainableMock();
    const validator2 = new ChainableMock();
    const spy = sinon.spy(validator2, "validate");
    validator1.setNext(validator2);

    const result = await validator1.validate({ valid: false });
    assert.deepStrictEqual(result, {
      valid: false,
      messages: ["Invalid payload"],
    });
    assert(spy.notCalled, "validator2.validate should not be called");
  });

  it("should use CompositeValidator as the end of the chain", async () => {
    class TestCompositeValidator extends CompositeValidator {
      async validate(payload: any): Promise<ValidationResult> {
        if (payload.compositeValid) {
          return { valid: true, messages: [] };
        }
        return { valid: false, messages: ["Composite validation failed"] };
      }
    }

    const validator = new ChainableMock();
    const compositeValidator = new TestCompositeValidator();
    validator.endChain(compositeValidator);

    const result1 = await validator.validate({
      valid: true,
      compositeValid: true,
    });
    assert.deepStrictEqual(result1, {
      valid: true,
      messages: [],
    });
    const result2 = await validator.validate({
      valid: true,
      compositeValid: false,
    });
    assert.deepStrictEqual(result2, {
      valid: false,
      messages: ["Composite validation failed"],
    });
  });
});
