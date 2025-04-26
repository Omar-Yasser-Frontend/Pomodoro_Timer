const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controller/TaskController");
const auth = require("../middleware/authMiddleware");
const validator = require("../middleware/validatorMiddleware");
const taskValidator = require("../utils/taskValidator");
const updateValidator = require("../utils/taskUpdateValidator");
const isAuth = require("../middleware/isAuth");

router.get("/", auth, isAuth, getTasks);

router.post("/", auth, isAuth, validator(taskValidator), createTask);

router.put("/:id", auth, isAuth, validator(updateValidator), updateTask);

router.delete("/:id", auth, isAuth, deleteTask);

module.exports = router;
