import { Router } from "express";
import { emailValidator } from "../validators/email.validator.js";
import { sendOtp } from "../controllers/sendOtp.controller.js";
import { verifyOtp } from "../controllers/verifyOtp.controller.js";
import { resetPassword } from "../controllers/resetPassword.controller.js";
import { passwordValidator } from "../validators/password.validator.js";

const otpRouter = Router();

otpRouter
  .post("/send", emailValidator, sendOtp)
  .post("/verify", verifyOtp)
  .post("/reset-password", emailValidator, passwordValidator, resetPassword);

export { otpRouter };
