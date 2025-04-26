const express = require("express");
const router = express.Router();

router.get("/api/task", async (req, res) => {
  if (req.query.userId) {
    const tasks = await Task.find({ userId: req.query.userId });

    res.json(tasks || []);
  } else {
    res.status(400).json({ message: "Inputs is not valid" });
  }
});

router.post("/api/task", async (req, res) => {
  console.log(req.body);
  if (taskValidator(req.body)) {
    const findUser = await User.findById(req.body.task.userId);

    if (findUser) {
      const task = await Task.create(req.body.task);

      res.json(task);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(400).json({ message: "Inputs is not valid" });
  }
});

router.delete("/api/task", async (req, res) => {
  if (req.body._id) {
    const deleteTask = await Task.findByIdAndDelete(req.body._id);

    if (deleteTask.deletedCount === 0)
      res.status(404).json({ message: "Task not fonud" });
    res.json(deleteTask || []);
  } else {
    res
      .status(400)
      .json({ message: "_id is required to delete specific data" });
  }
});

router.put("/api/task", async (req, res) => {
  console.log(req.body);
  if (updateValidator(req.body)) {
    const updateTask = await Task.findByIdAndUpdate(
      req.body._id,
      req.body.task
    );

    if (updateTask) {
      res.json(updateTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } else {
    res.status(400).json({ message: "Inputs is not valid" });
  }
});

module.exports = router;
