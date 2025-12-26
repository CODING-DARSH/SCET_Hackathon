const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { pool } = require("../db/db");
const { createAndSendOtp } = require("../services/otpService");

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  const { full_name, email, mobile_no, password } = req.body;
  if (!full_name || !email || !mobile_no || !password) {
    return res.json({ message: "All fields required" });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const user_id = uuidv4();

    await pool.query(
      `INSERT INTO users
       (user_id, full_name, email, mobile_no, password_hash)
       VALUES ($1,$2,$3,$4,$5)`,
      [user_id, full_name, email, mobile_no, hash]
    );

    await createAndSendOtp(user_id, email, "REGISTER");
    res.json({ message: "OTP sent to email" });
  } catch {
    res.json({ message: "User already exists" });
  }
});

/* ============ VERIFY REGISTER OTP ============ */
router.post("/verify-register-otp", async (req, res) => {
  const { email, otp } = req.body;

  const result = await pool.query(
    `SELECT o.*, u.user_id FROM otp_verification o
     JOIN users u ON u.user_id=o.user_id
     WHERE u.email=$1 AND o.otp_code=$2
       AND o.purpose='REGISTER'
       AND o.is_used=false
       AND o.expires_at > NOW()`,
    [email, otp]
  );

  if (result.rowCount === 0) {
    return res.json({ message: "Invalid or expired OTP" });
  }

  const user_id = result.rows[0].user_id;

  await pool.query(
    "UPDATE users SET is_verified=true WHERE user_id=$1",
    [user_id]
  );
  await pool.query(
    "UPDATE otp_verification SET is_used=true WHERE otp_id=$1",
    [result.rows[0].otp_id]
  );

  res.json({ message: "Registration successful" });
});

/* ============ LOGIN WITH PASSWORD ============ */
router.post("/login-password", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const user = result.rows[0];

    if (!user.password) {
      return res.status(500).json({
        message: "User password not set"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    res.json({
      message: "Login successful",
      user_id: user.id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
/* ============ LOGIN WITH OTP ============ */
router.post("/login-otp", async (req, res) => {
  const { email } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (user.rowCount === 0) {
    return res.json({ message: "User not found" });
  }

  await createAndSendOtp(user.rows[0].user_id, email, "LOGIN");
  res.json({ message: "OTP sent to email" });
});

/* ============ VERIFY LOGIN OTP ============ */
router.post("/verify-login-otp", async (req, res) => {
  const { email, otp } = req.body;

  const result = await pool.query(
    `SELECT o.*, u.user_id FROM otp_verification o
     JOIN users u ON u.user_id=o.user_id
     WHERE u.email=$1 AND o.otp_code=$2
       AND o.purpose='LOGIN'
       AND o.is_used=false
       AND o.expires_at > NOW()`,
    [email, otp]
  );

  if (result.rowCount === 0) {
    return res.json({ message: "Invalid or expired OTP" });
  }

  await pool.query(
    "UPDATE otp_verification SET is_used=true WHERE otp_id=$1",
    [result.rows[0].otp_id]
  );

  res.json({
    user_id: result.rows[0].user_id,
    message: "Login successful"
  });
});

module.exports = router;
