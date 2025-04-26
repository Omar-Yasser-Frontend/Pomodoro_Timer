const User = require("../models/user");
const loginValidator = require("../utils/loginValidator");
const asyncFn = require("../middleware/async");
const jwt = require("jsonwebtoken");
const generateCode = require("../utils/generateCode");
const sendEmail = require("../utils/mailer");
const gmailTemplate = require("../utils/gmailTemplate");

const login = asyncFn(async (req, res) => {
  if (!loginValidator(req.body)) res.status(400).send("Invalid Data...");

  const user = await User.getUser({
    email: req.body.email,
    password: req.body.password,
  });

  const userToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_TOKEN
  );

  res.cookie("token", userToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  if (user?.success === false) return res.status(user.code).send(user.message);

  res.status(200).json(user);
});

const register = asyncFn(async (req, res) => {
  req.body.isAuth = false;
  req.body.code = generateCode();
  console.log(req.body);

  const user = await new User(req.body).createUser();

  if (user?.success === false) return res.status(user.code).send(user.message);

  const userToken = jwt.sign(
    { id: user._id, email: user.email, isAuth: false },
    process.env.JWT_TOKEN
  );

  res.cookie("token", userToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  await sendEmail(user.email, gmailTemplate(req.body.code));

  res.status(200).send("email sent");
});

const confirmation = asyncFn(async (req, res) => {
  const user = await User.confirmEmail(req.user.email, req.body.code);

  if (user.success === false) return res.status(user.code).send(user.message);

  const userToken = jwt.sign(
    { ...req.user, isAuth: true },
    process.env.JWT_TOKEN
  );

  res.cookie("token", userToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.send("user now is authenticated");
});

const logout = asyncFn(async (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logged Out");
});

module.exports = {
  login,
  register,
  logout,
  confirmation,
};
