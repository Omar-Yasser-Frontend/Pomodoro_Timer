const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  confirmation,
} = require("../controller/userController");
const validationMiddleware = require("../middleware/validatorMiddleware");
const emailConfirm = require("../utils/emailConfirmation");
const loginValidator = require("../utils/loginValidator");
const registerValidator = require("../utils/registerValidator");
const auth = require("../middleware/authMiddleware");
const UniqueEmailMiddleware = require("../middleware/UniqueEmailMiddleware");

router.post("/login", validationMiddleware(loginValidator), login);
router.post(
  "/register",
  UniqueEmailMiddleware,
  validationMiddleware(registerValidator),
  register
);
router.post("/logout", logout);
router.post("/logout", logout);
router.post(
  "/confirmation",
  validationMiddleware(emailConfirm),
  auth,
  confirmation
);

module.exports = router;
