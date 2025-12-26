require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { testDBConnection } = require("./db/db");
testDBConnection();

// CREATE APP FIRST
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// ROUTES
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("Backend running successfully ✅");
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
