const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controller/ServerController");
const {
  authMiddleware,
  validatorMiddleware,
  isAuth,
} = require("../middleware/Middlewares");
const { taskValidator, taskUpdateValidator } = require("../utils/Validation");

router.get("/", authMiddleware, isAuth, getTasks);

router.post(
  "/",
  authMiddleware,
  isAuth,
  validatorMiddleware(taskValidator),
  createTask
);

router.put(
  "/:id",
  authMiddleware,
  isAuth,
  validatorMiddleware(taskUpdateValidator),
  updateTask
);

router.delete("/:id", authMiddleware, isAuth, deleteTask);

module.exports = router;
