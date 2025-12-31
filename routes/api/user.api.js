const { Router } = require("express");
const User = require("../../models/user");
const requireAuth = require("../../middleware/requireAuth");
const { loginLimiter, signupLimiter } = require("../../middleware/rateLimit");

const router = Router();

/* ================= SIGN UP ================= */
router.post("/signup", signupLimiter, async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    await User.create({
      fullname,
      email: email.toLowerCase(),
      password,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= LOGIN ================= */
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.matchPassword(
      email.toLowerCase(),
      password
    );

    req.session.user = {
      _id: user._id,
      role: user.role,
      fullname: user.fullname,
    };

    res.json({
      message: "Login successful",
      user: req.session.user,
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

/* ================= CURRENT USER ================= */
router.get("/me", requireAuth, (req, res) => {
  res.json({
    user: req.session.user,
  });
});

/* ================= LOGOUT ================= */
router.post("/logout", requireAuth, (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;
