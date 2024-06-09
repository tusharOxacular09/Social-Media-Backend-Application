import OtpRepository from "../repositories/otp.repository.js";
import { successMessageHandler } from "../../../middlewares/successMessage.middleware.js";
import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";

export const verifyOtp = async (req, res, next) => {
  try {
    // 1. Extracting email from request body
    const { email, otp } = req.body;

    // 2. validation
    if (!email || !otp) {
      throw new customErrorHandler(400, "Please provide both email and otp.");
    }

    // 3. Verifying the OTP
    await OtpRepository.verifyOtp(email, otp);

    // 4. Sending a success message to the user
    return successMessageHandler(res, 200, "OTP verified successfully.");
  } catch (error) {
    // Passing the error to the next middleware (Application-level error handler)
    next(error);
  }
};
