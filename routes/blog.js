const { Router } = require("express");
const Blog = require("../models/blog");

const router = Router();

/* ================= AUTH MIDDLEWARE ================= */
function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/user/signin");
  }
  next();
}

/* ================= NEW BLOG FORM ================= */
router.get("/new", requireAuth, (req, res) => {
  res.render("addBlog");
});

/* ================= CREATE NEW BLOG ================= */
router.post("/new", requireAuth, async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = await Blog.create({
      title,
      content,
      author: req.session.user._id,
      // published defaults to false
    });

    res.redirect(`/blog/${blog._id}`);
  } catch (err) {
    console.error("Error creating blog:", err);
    res.redirect("/blog/new");
  }
});

module.exports = router;