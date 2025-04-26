module.exports = (code) => {
  return `<div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05); font-family: sans-serif;">
  <h2 style="color: #333;">👋 Welcome to <span style="color: #007bff;">Pomodoro app</span>!</h2>

  <p style="color: #555;">
    Thank you for signing up. To verify your email address, please enter the following confirmation code in the app:
  </p>

  <div style="font-size: 24px; letter-spacing: 5px; background-color: #f1f1f1; padding: 15px 20px; border-radius: 8px; text-align: center; font-weight: bold; color: #333; margin: 20px 0;">
    ${code}
  </div>

  <p style="color: #888; font-size: 14px;">
    This code will expire in 10 minutes. If you did not request this, please ignore this email.
  </p>

  <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

  <p style="font-size: 13px; color: #999;">
    ⚠️ Please do not share this code with anyone. It can be used to access your account.
  </p>

  <p style="font-size: 12px; color: #ccc;">© 2025 YourAppName. All rights reserved.</p>
</div>
`;
};
