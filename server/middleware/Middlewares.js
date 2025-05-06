const jwt = require("jsonwebtoken");
const {
  User: { checkDuplication, getUsernByEmail },
} = require("../models/serverHandle");

// Unique Email Middleware
const uniqueEmailMiddleware = async (req, res, next) => {
  console.log(req.body.email);
  const email = await checkDuplication(req.body.email);

  console.log(email);

  if (email === undefined || email === null) return next();

  res.status(403).send("User already exists");
};

// Authentication Middleware
const authMiddleware = (req, res, next) => {
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

// Authorization Middleware
const isAuth = async (req, res, next) => {
  const email = req.user.email;

  const user = await getUsernByEmail(email);
  console.log(user);

  if (user.isAuth !== true) {
    return res.status(403).send("Please confirm email first");
  }

  next();
};

// Validator Middleware
const validatorMiddleware = function (validator) {
  return function (req, res, next) {
    if (!validator(req.body)) {
      res.status(400).send("Malformed input");
    } else {
      next();
    }
  };
};

// Error Middleware
const errorMiddleware = (err, req, res, next) => {
  for (const error in err.errors) {
    console.log(err[error]?.message);
  }
  console.log(err);
  res.status(500).send("Server internal error");
};

// Async Middleware
const asyncMiddleware = function (routeHandler) {
  return async function (req, res, next) {
    try {
      await routeHandler(req, res);
    } catch (e) {
      next(e);
    }
  };
};

// CORS Middleware
const originMiddleware = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle Preflight request (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
};

module.exports = {
  uniqueEmailMiddleware,
  authMiddleware,
  isAuth,
  validatorMiddleware,
  errorMiddleware,
  asyncMiddleware,
  originMiddleware,
};
