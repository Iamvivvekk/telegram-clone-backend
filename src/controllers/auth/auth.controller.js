import User from "../../models/user.model.js";
import { generateToken } from "../../utils/jwtUtility.js";

export const registerUser = async (req, res) => {
  const { email, password, fullName, mobile } = req.body;
  try {
    if (
      [email, password, fullName].some((element, index, e) => element === "")
    ) {
      return res.status(400).json({
        success: false,
        message: "Email, password and fullname is required",
      });
    }

    let userData = {
      email,
      password,
      fullName,
      mobile,
    };

    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        success: false,
        message: "User with same email already exists",
      });

    user = await User.create(userData);
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Something went wrong while registering",
      });

    return res
      .status(200)
      .json({ success: true, message: "Registration success" });
  } catch (error) {
    console.error("auth controller error");

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (
      [email, password].some(
        (element, index, arr) => element === "" || element === undefined
      )
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Both email & password required" });
    }

    let user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    user = await user.save({ validateBeforeSave: false });

    const { password: _password, ...userWithoutPassword } = user.toObject();

    res
      .status(200)
      .json({ success: true, message: "Logged in", user: userWithoutPassword });
  } catch (error) {
    console.error("auth controller error");

    return res.status(401).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    let user = await User.findById(req.id);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized, access denied" });

    user = await User.findByIdAndUpdate(req.id, { $set: { token: "" } });
    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("auth controller error");

    return res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  res.send("hello");
};
