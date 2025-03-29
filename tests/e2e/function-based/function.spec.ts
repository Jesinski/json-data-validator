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
});
