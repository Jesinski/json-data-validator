import { strict as assert } from "assert";
import { UserValidator } from "./mocks/UserValidator";

const VALID_PAYLOAD = {
  name: "John Doe",
  age: 25,
  email: "john.doe@example.com",
  street: "123 Main St",
  zipCode: "12345",
};

describe("Function Based Validator", () => {
  it("should return no messages when the payload is valid", () => {
    const validationMessages = UserValidator(VALID_PAYLOAD);
    assert.deepEqual(validationMessages, []);
  });

  it("should return no messages when the payload is valid", () => {
    const validationMessages = UserValidator(VALID_PAYLOAD);
    assert.deepEqual(validationMessages, []);
  });

  it("should return an error when the name is too short", () => {
    const invalidPayload = { ...VALID_PAYLOAD, name: "Jo" };
    const validationMessages = UserValidator(invalidPayload);
    assert.deepEqual(validationMessages, ["Name is too short"]);
  });

  it("should return an error when the user is too young", () => {
    const invalidPayload = { ...VALID_PAYLOAD, age: 17 };
    const validationMessages = UserValidator(invalidPayload);
    assert.deepEqual(validationMessages, ["Age must be over 18"]);
  });

  it("should return an error when the email is missing", () => {
    const invalidPayload = { ...VALID_PAYLOAD, email: undefined };
    const validationMessages = UserValidator(invalidPayload);
    assert.deepEqual(validationMessages, ["Email is required"]);
  });

  it("should return an error when the email is too short", () => {
    const invalidPayload = { ...VALID_PAYLOAD, email: "a@b." };
    const validationMessages = UserValidator(invalidPayload);
    assert.deepEqual(validationMessages, [
      "Email must be at least 5 characters long",
    ]);
  });

  it("should return an error when the email is too long", () => {
    const invalidPayload = {
      ...VALID_PAYLOAD,
      email: "a".repeat(51) + "@example.com",
    };
    const validationMessages = UserValidator(invalidPayload);
    assert.deepEqual(validationMessages, ["Email is too long"]);
  });

  it("should return an error when the email is missing '@' sign", () => {
    const invalidPayload = { ...VALID_PAYLOAD, email: "johndoeexample.com" };
    const validationMessages = UserValidator(invalidPayload);
    assert.deepEqual(validationMessages, ["Email is missing @ sign"]);
  });

  it("should return an error when the email is missing a domain", () => {
    const invalidPayload = { ...VALID_PAYLOAD, email: "johndoe@" };
    const validationMessages = UserValidator(invalidPayload);
    assert.deepEqual(validationMessages, ["Email is missing domain"]);
  });

  it("should return an error when the street is missing", () => {
    const invalidPayload = { ...VALID_PAYLOAD, street: undefined };
    const validationMessages = UserValidator(invalidPayload);
    assert.deepEqual(validationMessages, ["Street is required"]);
  });

  it("should return an error when the zip code is invalid", () => {
    const invalidPayload = { ...VALID_PAYLOAD, zipCode: "1234" };
    const validationMessages = UserValidator(invalidPayload);
    assert.deepEqual(validationMessages, ["Invalid zip code"]);
  });

  it("should return all errors in a composite", () => {
    const invalidPayload = { ...VALID_PAYLOAD, age: 16, street: undefined };
    const validationMessages = UserValidator(invalidPayload);
    assert.deepEqual(validationMessages, [
      "Age must be over 18",
      "Street is required",
    ]);
  });

  it("should return only the first error message of a chain", () => {
    const invalidPayload = { ...VALID_PAYLOAD, email: "abc" };
    const validationMessages = UserValidator(invalidPayload);
    assert.deepEqual(validationMessages, [
      "Email must be at least 5 characters long",
    ]);
  });
});
