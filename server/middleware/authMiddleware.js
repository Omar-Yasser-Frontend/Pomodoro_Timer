const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res
        .status(403)
        .send("Your are not authorized to perform this action");

    const user = jwt.verify(token, process.env.JWT_TOKEN);

    req.user = user;
    next();
  } catch (err) {
    return res.send("Invalid Credential...");
  }
};
