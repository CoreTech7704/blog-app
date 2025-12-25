require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");

const app = express();
const PORT = process.env.PORT || 8000;

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB error:", err));

/* ================= VIEW ENGINE ================= */
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

/* ================= MIDDLEWARE ================= */
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.resolve("./public")));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});


/* ================= ROUTES ================= */
app.get("/", (req, res) => {
  res.render("home", { title: "Home Page" });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

/* ================= SERVER ================= */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
