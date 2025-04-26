const express = require("express");
const mongoose = require("mongoose");
const app = express();
const errorMiddleware = require("./middleware/errorMiddleware");
const originMiddleware = require("./middleware/originMiddleware");
const tasksRouter = require("./routes/tasks");
const userRouter = require("./routes/user");
require("dotenv").config({ path: ".env.local" });
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
const nodemailer = require("nodemailer");
const cors = require("cors");

app.use(
  cors({
    origin: ["https://pomodoro-timer-hpdq.vercel.app/"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// app.use(originMiddleware);
app.use("/api", userRouter);
app.use("/api/tasks", tasksRouter);
app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("server connected"))
  .catch((err) => console.error("error ocurred " + err));

app.listen(port, () => console.log("starting server on port " + port + "..."));
