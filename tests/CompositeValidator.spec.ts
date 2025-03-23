import assert from "node:assert";
import { CompositeValidator } from "../src/validators/base/CompositeValidator";
import CompositeMock from "./mocks/CompositeMock";

describe("CompositeValidator", () => {
  it("should return no errors when no validators are added", () => {
    const compositeValidator = new CompositeValidator();
    const errors = compositeValidator.validate({});
    assert.deepStrictEqual(errors, []);
  });

  it("should return errors from a single validator", () => {
    const mockValidation = new CompositeMock(["Error 1"]);
    const compositeValidator = new CompositeValidator();
    compositeValidator.add(mockValidation);

    const errors = compositeValidator.validate({});
    assert.deepStrictEqual(errors, ["Error 1"]);
  });

  it("should return combined errors from multiple validators", () => {
    const mockValidation1 = new CompositeMock(["Error 1"]);
    const mockValidation2 = new CompositeMock(["Error 2"]);
    const compositeValidator = new CompositeValidator();
    compositeValidator.add([mockValidation1, mockValidation2]);

    const errors = compositeValidator.validate({});
    assert.deepStrictEqual(errors, ["Error 1", "Error 2"]);
  });

  it("should handle nested composite validators", () => {
    const mockValidation1 = new CompositeMock(["Error 1"]);
    const mockValidation2 = new CompositeMock(["Error 2"]);
    const nestedComposite = new CompositeValidator();
    nestedComposite.add(mockValidation2);

    const compositeValidator = new CompositeValidator();
    compositeValidator.add([mockValidation1, nestedComposite]);

    const errors = compositeValidator.validate({});
    assert.deepStrictEqual(errors, ["Error 1", "Error 2"]);
  });

  it("should handle an empty payload without errors if no validators fail", () => {
    const mockValidator = new CompositeMock([]);
    const compositeValidator = new CompositeValidator();
    compositeValidator.add(mockValidator);

    const errors = compositeValidator.validate({});
    assert.deepStrictEqual(errors, []);
  });
});
