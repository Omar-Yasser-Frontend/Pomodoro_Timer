module.exports = function (validator) {
  return function (req, res, next) {
    if (!validator(req.body)) {
      res.status(400).send("Malformed input");
    } else {
      next();
    }
  };
};
