import { mongoose } from "mongoose";
import { generateToken } from "../utils/jwtUtility.js";

import bcrypt, { hash, compare } from "bcrypt";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        },
        message: "Please enter a valid email address",
      },
    },
    password: { type: String, required: [true, "Password is required"] },
    fullName: { type: String, required: true },
    mobile: { type: Number, default: null },
    photoUrl: { type: String, default: null },
    token: { type: String, required: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  console.log("enterer in pre function");
  try {
    this.token = await generateToken(this._id, process.env.JWT_SECRET_KEY);

    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error("Compare password error:", error);
    return false;
  }
};

const User = mongoose.model("User", userSchema);

export default User;
