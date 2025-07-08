import { Router } from "express";
import {
  updateProfile,
  updateMobile,
} from "../controllers/user/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";

const userRoute = Router();

userRoute.route("/update/profile").patch(isAuthenticated, updateProfile);

userRoute.route("/update/mobile").patch(isAuthenticated, updateMobile);

export default userRoute;
