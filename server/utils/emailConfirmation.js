const Ajv = require("ajv").default;
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    code: { type: "number" },
  },
};

const validator = ajv.compile(schema);

module.exports = validator;
