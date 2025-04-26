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
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
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

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // true for port 465, false for other ports
//   auth: {
//     user: "helperemail14716@gmail.com",
//     pass: "mjdirefwseoqexkc",
//   },
// });

// async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: `"omar yasser" <helperemail14716@gmail.com>`, // sender address
//     to: "ranaomar14716@gmail.com", // list of receivers
//     subject: "Welcome, from Omar!",
//     html: "<h1>Thanks for reaching us we will fix it soon</h1>",
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);

app.listen(port, () => console.log("starting server on port " + port + "..."));
