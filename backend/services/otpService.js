require("dotenv").config();
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const { pool } = require("../db/db");

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function sendOtpEmail(email, otp, purpose) {
  await transporter.sendMail({
    from: `"Ai-Therapist" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Ai-Therapist OTP Verification",
    text: `Your OTP for ${purpose} is ${otp}. Valid for 5 minutes.`,
    html: `
      <h2>Ai-Therapist</h2>
      <p>Your OTP for <b>${purpose}</b> is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 5 minutes.</p>
    `,
  });

  console.log("✅ OTP email sent to:", email);
}

async function createAndSendOtp(user_id, email, purpose) {
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await pool.query(
    `INSERT INTO otp_verification
     (otp_id, user_id, otp_code, purpose, expires_at)
     VALUES ($1,$2,$3,$4,$5)`,
    [uuidv4(), user_id, otp, purpose, expiresAt]
  );

  await sendOtpEmail(email, otp, purpose);
}

module.exports = { createAndSendOtp };
