import { UserValidator } from "./validators/composites/UserValidator";

const userValidator = new UserValidator();

const payload1 = {
  name: "A", // Invalid
  age: 25,
  email: "jonh@doe.com",
  street: "123 Main St",
  zipCode: "12345",
};

const payload2 = {
  name: "John",
  age: 18,
  street: "",
  zipCode: "123",
};

console.log("payload1");
console.log(userValidator.validate(payload1));
console.log("payload2");
console.log(userValidator.validate(payload2));
