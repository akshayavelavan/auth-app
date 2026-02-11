const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");
const User = require("./models/User");

const app = express();

// 🌍 CORS
app.use(cors({
  origin: "*", // Replace with frontend URL in production
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

// Parse JSON
app.use(express.json());

// 🚦 RATE LIMITING FOR AUTH
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  message: { message: "Too many requests, try again later ❌" }
});
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// 📌 ROUTES
app.use("/api/auth", authRoutes);

// ROOT
app.get("/", (req, res) => {
  res.send("Secure Auth Server Running ✅");
});

// 🔒 DASHBOARD
app.get("/api/dashboard", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      user: {
        email: user.email,
        role: user.role || "user",
        lastLogin: user.lastLogin,
        joinedAt: user.createdAt
      },
      activity: [
        { action: "JWT Token verified", time: new Date() },
        { action: "Password hashed with bcrypt", time: new Date() },
        { action: "Rate limiting enabled", time: new Date() },
        { action: "Secure API route accessed", time: new Date() }
      ],
      message: `Welcome, ${user.email}! You are now on the dashboard.`
    });
  } catch (err) {
    console.error("Dashboard error ❌:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

// 🚀 START SERVER
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  } catch (err) {
    console.error("MongoDB connection error ❌:", err);
    process.exit(1);
  }
};

startServer();
