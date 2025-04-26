const Ajv = require("ajv").default;
const ajv = new Ajv();

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

module.exports = ajv.compile(updateSchema);
