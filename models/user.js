const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    prfileImageURL: {
      type: String,
      default: "/images/default.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return;
  }

  const salt = randomBytes(16).toString();
const hashedPassword = createHmac("sha256", salt)
  .update(user.password)
  .digest("hex");
  this.salt = salt;
  this.password = hashedPassword;
});

const User = model("User", userSchema);
module.exports = User;
