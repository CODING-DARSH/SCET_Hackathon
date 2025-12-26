const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const { pool } = require("../db/db");

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
//=====This is SMTP SERVER CODE WHICH IS NOT WORK NOW SO ITS RUN ON MOCK OTP ========
// const axios = require("axios");

// async function sendOtpEmail(email, otp) {
//   try {
//     console.log("📩 Sending OTP to:", email);

//     const response = await axios.post(
//       "https://api.brevo.com/v3/smtp/email",
//       {
//         sender: {
//           name: "SCET Hackathon",
//           email: process.env.BREVO_SENDER_EMAIL
//         },
//         to: [{ email }],
//         subject: "Your OTP Code",
//         htmlContent: `<h2>Your OTP is ${otp}</h2>`
//       },
//       {
//         headers: {
//           "api-key": process.env.BREVO_API_KEY,
//           "content-type": "application/json"
//         }
//       }
//     );

//     console.log("✅ Brevo response:", response.data);
//   } catch (error) {
//     console.error("❌ Brevo error:", error.response?.data || error.message);
//   }
// }
// module.exports = { sendOtpEmail };
async function sendOtpEmail(email, otp) {
  console.log("🔐 MOCK OTP for", email, ":", otp);
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

  await sendOtpEmail(email, otp);
}

module.exports = { createAndSendOtp };

