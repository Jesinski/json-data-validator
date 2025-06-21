import assert from "node:assert";
import { CompositeValidator } from "../../../src/pkg";
import CompositeMock from "./mocks/CompositeMock";

describe("CompositeValidator", () => {
  it("should return no errors when no validators are added", async () => {
    const compositeValidator = new CompositeValidator();
    const errors = await compositeValidator.validate({});
    assert.deepStrictEqual(errors, { valid: true, messages: [] });
  });

  it("should return errors from a single validator", async () => {
    const mockValidation = new CompositeMock({
      valid: false,
      messages: ["Error 1"],
    });
    const compositeValidator = new CompositeValidator();
    compositeValidator.add(mockValidation);

    const errors = await compositeValidator.validate({});
    assert.deepStrictEqual(errors, {
      valid: false,
      messages: ["Error 1"],
    });
  });

  it("should return combined errors from multiple validators", async () => {
    const mockValidation1 = new CompositeMock({
      valid: false,
      messages: ["Error 1"],
    });
    const mockValidation2 = new CompositeMock({
      valid: false,
      messages: ["Error 2"],
    });
    const compositeValidator = new CompositeValidator();
    compositeValidator.add([mockValidation1, mockValidation2]);

    const errors = await compositeValidator.validate({});
    assert.deepStrictEqual(errors, {
      valid: false,
      messages: ["Error 1", "Error 2"],
    });
  });

  it("should handle nested composite validators", async () => {
    const mockValidation1 = new CompositeMock({
      valid: false,
      messages: ["Error 1"],
    });
    const mockValidation2 = new CompositeMock({
      valid: false,
      messages: ["Error 2"],
    });
    const nestedComposite = new CompositeValidator();
    nestedComposite.add(mockValidation2);

    const compositeValidator = new CompositeValidator();
    compositeValidator.add([mockValidation1, nestedComposite]);

    const errors = await compositeValidator.validate({});
    assert.deepStrictEqual(errors, {
      valid: false,
      messages: ["Error 1", "Error 2"],
    });
  });

  it("should handle an empty payload without errors if no validators fail", async () => {
    const mockValidator = new CompositeMock({ valid: true, messages: [] });
    const compositeValidator = new CompositeValidator();
    compositeValidator.add(mockValidator);

    const errors = await compositeValidator.validate({});
    assert.deepStrictEqual(errors, { valid: true, messages: [] });
  });
});
