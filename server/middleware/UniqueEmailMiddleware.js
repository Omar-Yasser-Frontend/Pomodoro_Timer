const { checkDuplication } = require("../models/user");

module.exports = async (req, res, next) => {
  console.log(req.body.email);
  const email = await checkDuplication(req.body.email);

  console.log(email);

  if (email === undefined || email === null) return next();

  res.status(403).send("User already exists");
};
