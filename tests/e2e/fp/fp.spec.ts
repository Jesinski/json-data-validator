import assert from "assert";
import { EmailValidator } from "./mocks/EmailValidator";

const VALID_PAYLOAD = {
  name: "John Doe",
  age: 25,
  email: "john.doe@example.com",
  street: "123 Main St",
  zipCode: "12345",
};

describe.only("FP probe", () => {
  it("should not return error if email is defined", async () => {
    const result = await EmailValidator(VALID_PAYLOAD);
    assert.deepEqual(result, { valid: true, messages: [] });
  });

  it("should return error if email is not defined", async () => {
    const invalidPayload = {
      ...VALID_PAYLOAD,
      email: undefined,
    };
    const result = await EmailValidator(invalidPayload);
    assert.deepEqual(result, {
      valid: false,
      messages: ["Email is required"],
    });
  });

  it("should return an error when the email is too short", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, email: "a@b." };
    const result = await EmailValidator(invalidPayload);
    assert.deepEqual(result, {
      valid: false,
      messages: ["Email must be at least 5 characters long"],
    });
  });
});
