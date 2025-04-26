const Ajv = require("ajv").default;
const ajv = new Ajv();

const loginSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    },
    password: { type: "string", minLength: 8 },
  },
  required: ["email", "password"],
};

const validator = ajv.compile(loginSchema);

module.exports = validator;
