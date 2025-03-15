import { UserValidator } from "./validators/composites/UserValidator";

const userValidator = new UserValidator();

const payload1 = {
  name: "A", // Invalid
  age: 25,
  street: "123 Main St",
  zipCode: "12345",
};

const payload2 = {
  name: "John",
  age: 17, // Invalid (stops profile validation)
  street: "",
  zipCode: "123",
};

console.log(userValidator.validate(payload1));

console.log(userValidator.validate(payload2));
