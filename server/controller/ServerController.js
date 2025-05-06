const { Task, User } = require("../models/serverHandle");
const { loginValidation } = require("../utils/Validation");
const { asyncMiddleware } = require("../middleware/Middlewares");
const jwt = require("jsonwebtoken");
const generateCode = require("../utils/generateCode");
const sendEmail = require("../utils/mailer");
const gmailTemplate = require("../utils/gmailTemplate");

// Task Controllers
const getTasks = asyncMiddleware(async (req, res) => {
  const tasks = await Task.getTasks(req.user.id);

  console.log(req.user);
  console.log("got here");

  if (tasks.success === false)
    return res.status(tasks.code).send(tasks.message);

  res.status(200).json(tasks);
});

const createTask = asyncMiddleware(async (req, res) => {
  req.body.task.userId = req.user.id;
  console.log(req.body);
  console.log("req.body.userId");

  const newTask = await new Task(req.body).createTask();

  if (newTask.success === false)
    return res.status(newTask.code).send(newTask.message);

  res.status(201).json(newTask);
});

const updateTask = asyncMiddleware(async (req, res) => {
  const updateTask = await Task.updateTask(
    req.params.id,
    req.body.task,
    req.user.id
  );

  if (updateTask.success === false)
    return res.status(updateTask.code).send(updateTask.message);

  res.status(201).json(updateTask);
});

const deleteTask = asyncMiddleware(async (req, res) => {
  const deletedTask = await Task.deleteTask(req.params.id, req.user.id);

  if (deletedTask.success === false)
    return res.status(deletedTask.code).send(deletedTask.message);

  res.json(deletedTask);
});

// User Controllers
const login = asyncMiddleware(async (req, res) => {
  if (!loginValidation(req.body)) res.status(400).send("Invalid Data...");

  const user = await User.getUser({
    email: req.body.email,
    password: req.body.password,
  });

  const userToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_TOKEN
  );

  res.cookie("token", userToken, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 2000,
    path: "/",
  });

  if (user?.success === false) return res.status(user.code).send(user.message);

  res.status(200).json(user);
});

const register = asyncMiddleware(async (req, res) => {
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
    httpOnly: false,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 2000,
    path: "/",
  });

  await sendEmail(user.email, gmailTemplate(req.body.code));

  res.status(200).send("email sent");
});

const confirmation = asyncMiddleware(async (req, res) => {
  const user = await User.confirmEmail(req.user.email, req.body.code);

  if (user.success === false) return res.status(user.code).send(user.message);

  const userToken = jwt.sign(
    { ...req.user, isAuth: true },
    process.env.JWT_TOKEN
  );

  res.cookie("token", userToken, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 2000,
    path: "/",
  });

  res.send("user now is authenticated");
});

const logout = asyncMiddleware(async (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logged Out");
});

module.exports = {
  // Task exports
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  // User exports
  login,
  register,
  logout,
  confirmation,
};
