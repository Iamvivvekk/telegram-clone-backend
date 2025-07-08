import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";

import {
  login,
  registerUser,
  resetPassword,
  logout,
} from "../controllers/auth/auth.controller.js";

const authRoute = Router();

authRoute.route("/register").post(registerUser);
authRoute.route("/login").post(login);
authRoute.route("/reset-password").post(resetPassword);
authRoute.route("/logout").get(isAuthenticated, logout);

export default authRoute;
