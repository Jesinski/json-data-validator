import { strict as assert } from "assert";
import { AsyncValidator } from "./mocks/validators/AsyncValidator";

const VALID_PAYLOAD = {
  name: "John Doe",
  age: 25,
  email: "john.doe@example.com",
  street: "123 Main St",
  zipCode: "12345",
};

describe("Async Function Based Validator", () => {
  it("should return no messages when the payload is valid", async () => {
    const validationMessages = await AsyncValidator(VALID_PAYLOAD);
    assert.deepEqual(validationMessages, { valid: true, messages: [] });
  });

  it("should return an error when the user is too young", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, age: 17 };
    const validationMessages = await AsyncValidator(invalidPayload);
    assert.deepEqual(validationMessages, {
      valid: false,
      messages: ["Age must be over 18"],
    });
  });

  it("should return an error when the email is missing", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, email: undefined };
    const validationMessages = await AsyncValidator(invalidPayload);
    assert.deepEqual(validationMessages, {
      valid: false,
      messages: ["Email is required"],
    });
  });

  it("should return an error when the email is too short", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, email: "a@b." };
    const validationMessages = await AsyncValidator(invalidPayload);
    assert.deepEqual(validationMessages, {
      valid: false,
      messages: ["Email must be at least 5 characters long"],
    });
  });

  it("should return an error when the street is missing", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, street: undefined };
    const validationMessages = await AsyncValidator(invalidPayload);
    assert.deepEqual(validationMessages, {
      valid: false,
      messages: ["Street is required"],
    });
  });

  it("should return an error when the zip code is invalid", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, zipCode: "1234" };
    const validationMessages = await AsyncValidator(invalidPayload);
    assert.deepEqual(validationMessages, {
      valid: false,
      messages: ["Invalid zip code"],
    });
  });

  it("should return all errors in a composite", async () => {
    const invalidPayload = {
      ...VALID_PAYLOAD,
      email: undefined,
      street: undefined,
    };
    const validationMessages = await AsyncValidator(invalidPayload);
    assert.deepEqual(validationMessages, {
      valid: false,
      messages: ["Email is required", "Street is required"],
    });
  });

  it("should return only the first error message of a chain", async () => {
    const invalidPayload = {
      ...VALID_PAYLOAD,
      street: undefined,
      zipCode: "12",
    };
    const validationMessages = await AsyncValidator(invalidPayload);
    assert.deepEqual(validationMessages, {
      valid: false,
      messages: ["Street is required"],
    });
  });
});
