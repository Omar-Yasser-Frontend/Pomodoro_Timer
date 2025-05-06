const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Task Schema and Model
const TaskSchema = new mongoose.Schema({
  userId: { type: String, trim: true },
  title: { type: String, trim: true },
  description: { type: String, trim: true },
  completed: Boolean,
  targetCount: { type: Number, min: 1 },
  count: Number,
});
const TaskModel = mongoose.model("task", TaskSchema);

// User Schema and Model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isAuth: { type: Boolean },
  code: { type: Number },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
  next();
});

const UserModel = mongoose.model("user", UserSchema);

// Task Class
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

// User Class
class User {
  constructor({ username, password, email, isAuth, code }) {
    this.email = email;
    this.password = password;
    this.username = username;
    this.isAuth = isAuth;
    this.code = code;
  }

  static async checkDuplication(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (err) {
      console.log(err);
      return { success: false, code: 500, message: "Something went wrong" };
    }
  }

  static async getUsernByEmail(email) {
    try {
      const user = await UserModel.findOne({ email });

      if (!user)
        return { success: false, code: 404, message: "User not found" };

      let userObj = user.toObject();
      delete userObj.password;
      delete userObj.code;

      return userObj;
    } catch (err) {
      console.log(err);
      return { success: false, code: 500, message: "Something went wrong" };
    }
  }

  static async getUser({ email, password }) {
    try {
      const user = await UserModel.findOne({ email });

      if (!user)
        return { success: false, code: 404, message: "User not found" };

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword)
        return {
          success: false,
          code: 400,
          message: "Email or password is invalid",
        };

      let userObj = user.toObject();
      delete userObj.password;
      delete userObj.code;

      return userObj;
    } catch (err) {
      console.log(err);
      return { success: false, code: 500, message: "Something went wrong" };
    }
  }

  async createUser() {
    try {
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password,
        isAuth: this.isAuth,
        code: this.code,
      };

      const user = new UserModel(userData);
      await user.save();
      let userObj = user.toObject();
      delete userObj.password;

      return userObj;
    } catch (err) {
      console.log(err);
      return { success: false, code: 500, message: "Something went wrong" };
    }
  }

  async isUserExists(userId) {
    try {
      const user = await User.findOne({ _id: userId });
      return !!user;
    } catch (err) {
      console.log(err);
      return { success: false, code: 500, message: "Something went wrong" };
    }
  }

  static async confirmEmail(email, code) {
    console.log("here");
    try {
      const user = await UserModel.findOne({ email });

      if (Number(code) === Number(user.code) && user.code !== null)
        return await UserModel.findOneAndUpdate(
          { email },
          { isAuth: true, code: null }
        );
      return { success: false, code: 400, message: "Invalid code" };
    } catch (err) {
      return { success: false, code: 500, message: "Something went wrong" };
    }
  }
}

module.exports = {
  Task,
  User,
  TaskModel,
  UserModel,
};
