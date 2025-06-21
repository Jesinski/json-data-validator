import assert from "assert";
import sinon from "sinon";
import { ValidateComposite } from "../../src/pkg";

describe("ValidateComposite", () => {
  it("should validate successfully when payload is valid", async () => {
    const validator = ValidateComposite(() => ({ valid: true, messages: [] }));
    const result = await validator({});
    assert.deepStrictEqual(result, { valid: true, messages: [] });
  });

  it("should return errors when payload is invalid", async () => {
    const validator = ValidateComposite(() => ({
      valid: false,
      messages: ["Invalid payload"],
    }));
    const result = await validator({});
    assert.deepStrictEqual(result, {
      valid: false,
      messages: ["Invalid payload"],
    });
  });

  it("should execute all validations if all true", async () => {
    const validation1 = sinon.spy(() => ({ valid: true, messages: [] }));
    const validation2 = sinon.spy(() => ({ valid: true, messages: [] }));

    await ValidateComposite(validation1, validation2)({});

    assert(validation1.calledOnce);
    assert(validation2.calledOnce);
  });

  it("should execute all validations if some true", async () => {
    const validation1 = sinon.spy(() => ({
      valid: false,
      messages: ["Error"],
    }));
    const validation2 = sinon.spy(() => ({ valid: true, messages: [] }));

    await ValidateComposite(validation1, validation2)({});

    assert(validation1.calledOnce);
    assert(validation2.calledOnce);
  });

  it("should execute all validations if all false", async () => {
    const validation1 = sinon.spy(() => ({
      valid: false,
      messages: ["Error"],
    }));
    const validation2 = sinon.spy(() => ({
      valid: false,
      messages: ["Error2"],
    }));

    await ValidateComposite(validation1, validation2)({});

    assert(validation1.calledOnce);
    assert(validation2.calledOnce);
  });

  it("should aggregate messages", async () => {
    const validation1 = sinon.spy(() => ({
      valid: false,
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

    const result = await ValidateComposite(
      validation1,
      validation2,
      validation3
    )({});

    assert.deepStrictEqual(result, {
      valid: false,
      messages: ["Warning", "Warning2", "Error"],
    });
  });

  it("should not leak messages", async () => {
    const chainValidator = ValidateComposite(
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
