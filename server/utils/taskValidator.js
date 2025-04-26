const Ajv = require("ajv").default;
const ajv = new Ajv();

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

module.exports = ajv.compile(taskSchema);
