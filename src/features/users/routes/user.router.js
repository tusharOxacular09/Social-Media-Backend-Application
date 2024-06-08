import { Router } from "express";
import { Register } from "../controllers/register.controller.js";
import { registerValidator } from "../validators/register.validator.js";
import { Login } from "../controllers/login.controller.js";
import { loginValidator } from "../validators/login.validator.js";
import {
  Logout,
  LogoutFromAllDevices,
} from "../controllers/logout.controller.js";
import UserDetailsController from "../controllers/userDetails.controller.js";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";
import { updateUserDetailsValidator } from "../validators/updateUserDetails.validator.js";

// Initializing the router
const userRouter = Router();

userRouter
  .post("/register", registerValidator, Register)
  .post("/login", loginValidator, Login)
  .post("/logout", Logout)
  .post("/logout-all-devices", LogoutFromAllDevices)
  .get(
    "/get-details/:userId",
    authMiddleware,
    UserDetailsController.getUserDetails
  )
  .get(
    "/get-all-details",
    authMiddleware,
    UserDetailsController.getAllUserDetails
  )
  .put(
    "/update-details/:userId",
    authMiddleware,
    updateUserDetailsValidator,
    UserDetailsController.updateUserDetails
  );

export { userRouter };
