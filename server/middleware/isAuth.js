const { getUsernByEmail } = require("../models/user");

module.exports = async (req, res, next) => {
  const email = req.user.email;

  const user = await getUsernByEmail(email);
  console.log(user);

  if (user.isAuth !== true) {
    return res.status(403).send("Please confirm email first");
  }

  next();
};
