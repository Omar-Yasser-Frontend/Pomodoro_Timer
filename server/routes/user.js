const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  confirmation,
} = require("../controller/ServerController");
const {
  validatorMiddleware,
  uniqueEmailMiddleware,
  authMiddleware,
} = require("../middleware/Middlewares");
const emailConfirm = require("../utils/emailConfirmation");
const { loginValidation, registerValidator } = require("../utils/Validation");

router.post("/login", validatorMiddleware(loginValidation), login);
router.post("/register", validatorMiddleware(registerValidator), register);
router.post("/logout", logout);
router.post(
  "/confirmation",
  validatorMiddleware(emailConfirm),
  authMiddleware,
  confirmation
);

module.exports = router;
