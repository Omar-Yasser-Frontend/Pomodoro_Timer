const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: { type: String, trim: true },
  title: { type: String, trim: true },
  description: { type: String, trim: true },
  completed: Boolean,
  targetCount: { type: Number, min: 1 },
  count: Number,
});
const TaskModel = mongoose.model("task", TaskSchema);

class Task {
  constructor(task) {
    this.task = task;
  }

  static async getTasks(userId) {
    try {
      const tasks = await TaskModel.find({ userId });

      return tasks;
    } catch (err) {
      return { success: false, code: 500, message: "Internal server error..." };
    }
  }

  async createTask() {
    try {
      console.log(this.task.task);
      const tasks = await new TaskModel(this.task.task);
      tasks.save();
      return tasks;
    } catch (err) {
      return { success: false, code: 500, message: "Internal server error..." };
    }
  }

  static async updateTask(taskId, update, userId) {
    try {
      const user = await TaskModel.findOne({ _id: taskId });
      console.log(user);
      const checkAuthority = user.userId === userId;
      console.log(user.userId, userId);
      console.log(checkAuthority);
      if (checkAuthority) {
        const tasks = await TaskModel.findByIdAndUpdate(taskId, update);

        if (!tasks)
          return { success: false, code: 404, message: "Task not found" };

        return tasks;
      } else {
        return {
          success: false,
          code: 403,
          message: "You are not authorized to perform this action",
        };
      }
    } catch (err) {
      return { success: false, code: 500, message: "Internal server error..." };
    }
  }

  static async deleteTask(taskId, userId) {
    console.log(taskId, userId);
    try {
      const user = await TaskModel.findOne({ _id: taskId });
      const checkAuthority = user.userId === userId;
      if (checkAuthority) {
        const tasks = await TaskModel.findByIdAndDelete(taskId);

        if (!tasks)
          return { success: false, code: 404, message: "Task not found" };

        return tasks;
      } else {
        return {
          success: false,
          code: 403,
          message: "You Are not Authorized to perform this action",
        };
      }
    } catch (err) {
      console.log(err);
      return { success: false, code: 500, message: "Internal server error..." };
    }
  }
}

module.exports = Task;
