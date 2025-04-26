const Ajv = require("ajv").default;
const ajv = new Ajv();

const registerSchema = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 3 },
    email: {
      type: "string",
      minLength: 5,
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    },
    password: { type: "string", minLength: 8 },
  },
  required: ["username", "email", "password"],
};

const validator = ajv.compile(registerSchema);

module.exports = validator;
