import assert from "assert";
import { UserValidator } from "./mocks/UserValidator";

const VALID_PAYLOAD = {
  name: "John Doe",
  age: 25,
  email: "john.doe@example.com",
  street: "123 Main St",
  zipCode: "12345",
};

describe("Functional implementation", () => {
  it("should not return error if email is defined", async () => {
    const result = await UserValidator(VALID_PAYLOAD);
    assert.deepEqual(result, { valid: true, messages: [] });
  });

  it("should return error if email is not defined", async () => {
    const invalidPayload = {
      ...VALID_PAYLOAD,
      email: undefined,
    };
    const result = await UserValidator(invalidPayload);
    assert.deepEqual(result, {
      valid: false,
      messages: ["Email is required"],
    });
  });

  it("should return an error when the email is too short", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, email: "a@b." };
    const result = await UserValidator(invalidPayload);
    assert.deepEqual(result, {
      valid: false,
      messages: ["Email must be at least 5 characters long"],
    });
  });

  it("should return a message if email has $ symbol", async () => {
    const invalidPayload = {
      ...VALID_PAYLOAD,
      email: "jesinki@$dollarsign.com",
    };
    const result = await UserValidator(invalidPayload);
    assert.deepEqual(result, {
      valid: true,
      messages: ["Email has $ symbol."],
    });
  });

  it("should return two messages if email has a $ symbol and is too short", async () => {
    const invalidPayload = {
      ...VALID_PAYLOAD,
      email: "$",
    };
    const result = await UserValidator(invalidPayload);
    assert.deepEqual(result, {
      valid: false,
      messages: [
        "Email has $ symbol.",
        "Email must be at least 5 characters long",
      ],
    });
  });

  it("should return an error when the name is too short", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, name: "Jo" };
    const result = await UserValidator(invalidPayload);
    assert.deepEqual(result, {
      valid: false,
      messages: ["Name is too short"],
    });
  });

  it("should return an error when the name and email is too short", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, name: "Jo", email: "a@b." };
    const result = await UserValidator(invalidPayload);

    assert.equal(result.valid, false);
    const expectedMessages = [
      "Name is too short",
      "Email must be at least 5 characters long",
    ];

    assert.equal(result.messages.length, expectedMessages.length);
    for (const message of expectedMessages) {
      assert.equal(result.messages.includes(message), true);
    }
  });

  it("should return only age error if age is less than 18 and street is undefined", async () => {
    const invalidPayload = {
      ...VALID_PAYLOAD,
      age: 10,
      street: undefined,
    };
    const result = await UserValidator(invalidPayload);
    assert.deepEqual(result, {
      valid: false,
      messages: ["Too young"],
    });
  });

  it("should return error if street is not defined", async () => {
    const invalidPayload = {
      ...VALID_PAYLOAD,
      street: undefined,
    };
    const result = await UserValidator(invalidPayload);
    assert.deepEqual(result, {
      valid: false,
      messages: ["Street not defined"],
    });
  });
});
