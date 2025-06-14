const VALID_PAYLOAD = {
  nicknames: [
    { id: "nick1", value: "Johnny" },
    { id: "nick2", value: "JD" },
  ],
  name: "nick1",
  email: {
    address: "john.doe@example.com",
    preferredHour: "14:00",
    type: "work",
  },
  addresses: [
    {
      id: "addr1",
      street: "123 Main St",
      zipCode: "12345",
    },
    {
      id: "addr2",
      street: "456 Elm St",
      zipCode: "67890",
    },
  ],
  location: "addr1",
};

function validateUser(payload: any): string[] {
  const errors: string[] = [];

  if (!payload.name) {
    errors.push("Name is required.");
  } else if (payload.name.length < 3) {
    errors.push("Name must be at least 3 characters long.");
  }

  if (!payload.age) {
    errors.push("Age is required.");
  } else if (typeof payload.age !== "number" || payload.age <= 0) {
    errors.push("Age must be a positive number.");
  } else if (payload.age < 18) {
    errors.push("Age must be at least 18.");
  }

  return errors;
}

// Example usage:
const errors = validateUser(VALID_PAYLOAD);
console.log(errors.length === 0 ? "Valid user!" : errors);
