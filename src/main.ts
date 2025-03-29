import { pkgUserValidator } from "./pkgUserValidator";
import { UserValidator } from "./validators/UserValidator";

const payload1 = {
  name: "A", // Invalid
  age: 25,
  email: "aaa@aaa.",
  street: "123 Main St",
  zipCode: "12345",
};

const payload2 = {
  name: "John",
  age: 19,
  email:
    "a@a.comaaaaaqqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqwcomaaaaaqqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqwcomaaaaaqqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqwcomaaaaaqqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqw",
  street: "aaaaaa",
  zipCode: "123",
};
// Main validator encapsulates all the required validations
const userValidator = new UserValidator();
console.log("payload1");
console.log(userValidator.validate(payload1));
console.log("payload2");
console.log(userValidator.validate(payload2));

console.log("payload1");
console.log(pkgUserValidator.validate(payload1));
console.log("payload2");
console.log(pkgUserValidator.validate(payload2));
