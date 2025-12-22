const { Router } = require("express");
const { createHmac } = require("crypto");
const User = require("../models/user");

const router = Router();

// SIGNIN
router.get("/signin", (req, res) => {
  res.render("signin", {
    error: req.query.error || null,
  });
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.redirect("/user/signin?error=Invalid credentials");
    }

    const hashedPassword = createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== user.password) {
      return res.redirect("/user/signin?error=Invalid credentials");
    }

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.redirect("/user/signin?error=Something went wrong");
  }
});

//SIGNUP
router.get("/signup", (req, res) => {
  res.render("signup", {
    error: req.query.error || null,
  });
});

router.post("/signup", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.redirect("/user/signup?error=Email already in use");
    }

    await User.create({
      fullname,
      email: email.toLowerCase(),
      password,
    });

    return res.redirect("/user/signin");
  } catch (err) {
    console.error(err);

    if (err.code === 11000) {
      return res.redirect("/user/signup?error=Email already in use");
    }

    return res.redirect("/user/signup?error=Something went wrong");
  }
});

module.exports = router;
