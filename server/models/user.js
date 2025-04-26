const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

module.exports = User;
module.default = UserModel;
