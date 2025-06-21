import assert from "assert";
import sinon from "sinon";
import { ValidateChain } from "../../src/pkg";

describe("ValidateChain", () => {
  it("should validate successfully when payload is valid", async () => {
    const validator = ValidateChain(() => ({ valid: true, messages: [] }));
    const result = await validator({});
    assert.deepStrictEqual(result, { valid: true, messages: [] });
  });

  it("should return errors when payload is invalid", async () => {
    const validator = ValidateChain(() => ({
      valid: false,
      messages: ["Invalid payload"],
    }));
    const result = await validator({});
    assert.deepStrictEqual(result, {
      valid: false,
      messages: ["Invalid payload"],
    });
  });

  it("should pass validation to the next validator in the chain", async () => {
    const validation1 = sinon.spy(() => ({ valid: true, messages: [] }));
    const validation2 = sinon.spy(() => ({ valid: true, messages: [] }));

    const result = await ValidateChain(validation1, validation2)({});

    assert.deepStrictEqual(result, { valid: true, messages: [] });
    assert(validation1.calledOnce);
    assert(validation2.calledOnce);
    assert(validation1.calledBefore(validation2));
  });

  it("should stop validation chain when an error is found", async () => {
    const validation1 = sinon.spy(() => ({
      valid: false,
      messages: ["Error"],
    }));
    const validation2 = sinon.spy(() => ({ valid: true, messages: [] }));

    const result = await ValidateChain(validation1, validation2)({});

    assert.deepStrictEqual(result, { valid: false, messages: ["Error"] });
    assert(validation1.calledOnce);
    assert(validation2.notCalled);
  });

  it("should aggregate messages", async () => {
    const validation1 = sinon.spy(() => ({
      valid: true,
      messages: ["Warning"],
    }));
    const validation2 = sinon.spy(() => ({
      valid: true,
      messages: ["Warning2"],
    }));
    const validation3 = sinon.spy(() => ({
      valid: false,
      messages: ["Error"],
    }));

    const result = await ValidateChain(
      validation1,
      validation2,
      validation3
    )({});

    assert.deepStrictEqual(result, {
      valid: false,
      messages: ["Warning", "Warning2", "Error"],
    });
    assert(validation1.calledOnce);
    assert(validation2.calledOnce);
    assert(validation2.calledAfter(validation1));
    assert(validation3.calledOnce);
    assert(validation3.calledAfter(validation2));
  });

  it("should not leak messages", async () => {
    const chainValidator = ValidateChain(
      () => ({ valid: true, messages: ["Valid"] }),
      () => ({ valid: false, messages: ["Invalid"] }),
      () => ({ valid: true, messages: [] })
    );

    const result1 = await chainValidator({});
    assert.deepEqual(result1, {
      valid: false,
      messages: ["Valid", "Invalid"],
    });

    const result2 = await chainValidator({});
    assert.deepEqual(result2, {
      valid: false,
      messages: ["Valid", "Invalid"],
    });
  });
});
