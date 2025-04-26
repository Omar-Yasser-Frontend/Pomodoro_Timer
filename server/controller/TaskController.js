const Task = require("../models/tasks");
const asyncFn = require("../middleware/async");

const getTasks = asyncFn(async (req, res) => {
  const tasks = await Task.getTasks(req.user.id);

  console.log(req.user);
  console.log("got here");

  if (tasks.success === false)
    return res.status(tasks.code).send(tasks.message);

  res.status(200).json(tasks);
});

const createTask = asyncFn(async (req, res) => {
  req.body.task.userId = req.user.id;
  console.log(req.body);
  console.log("req.body.userId");

  const newTask = await new Task(req.body).createTask();

  if (newTask.success === false)
    return res.status(newTask.code).send(newTask.message);

  res.status(201).json(newTask);
});

const updateTask = asyncFn(async (req, res) => {
  const updateTask = await Task.updateTask(
    req.params.id,
    req.body.task,
    req.user.id
  );

  if (updateTask.success === false)
    return res.status(updateTask.code).send(updateTask.message);

  res.status(201).json(updateTask);
});

const deleteTask = asyncFn(async (req, res) => {
  const deletedTask = await Task.deleteTask(req.params.id, req.user.id);

  if (deletedTask.success === false)
    return res.status(deletedTask.code).send(deletedTask.message);

  res.json(deletedTask);
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
