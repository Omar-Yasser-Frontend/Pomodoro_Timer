const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env.local" });

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: email,
    pass: pass,
  },
});

async function sendEmail(to, message) {
  const info = await transporter.sendMail({
    from: `"pomodoro app" <${email}>`,
    to: to,
    subject: "Email confirmation for pomodoro app",
    plain: "Email Confirmation",
    html: message,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;
