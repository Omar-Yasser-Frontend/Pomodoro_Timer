const Ajv = require("ajv").default;
const ajv = new Ajv();

// Login Schema
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

// Register Schema a
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

// Task Schema
const taskSchema = {
  type: "object",
  properties: {
    task: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        completed: { type: "boolean" },
        targetCount: { type: "integer" },
        count: { type: "integer" },
      },
      required: ["title", "description", "completed", "targetCount", "count"],
    },
  },
  required: ["task"],
};

// Task Update Schema
const updateSchema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    task: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        completed: { type: "boolean" },
        targetCount: { type: "integer" },
        count: { type: "integer" },
      },
    },
  },
};

// Compile validators
const loginValidation = ajv.compile(loginSchema);
const registerValidator = ajv.compile(registerSchema);
const taskValidator = ajv.compile(taskSchema);
const taskUpdateValidator = ajv.compile(updateSchema);

module.exports = {
  loginValidation,
  registerValidator,
  taskValidator,
  taskUpdateValidator,
};
