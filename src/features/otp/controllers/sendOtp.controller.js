import { sendEmail } from "../../../middlewares/sendEmail.middleware.js";
import OtpRepository from "../repositories/otp.repository.js";
import { successMessageHandler } from "../../../middlewares/successMessage.middleware.js";

/**
 * Send an OTP to the user's email for verification.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves to void.
 * @throws {customErrorHandler} If there is an error while processing the OTP request.
 */
export const sendOtp = async (req, res, next) => {
  try {
    // 1. Extracting email from request body
    const { email } = req.body;

    // 2. Creating a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // 3. Creating OTP expiration time (2 minutes from now)
    const now = new Date();
    const expirationTime = now.getTime() + 2 * 60000;
    const expirationDate = new Date(expirationTime);

    // 4. Saving the OTP inside the database
    const saveOTP = await OtpRepository.addOTP(email, otp, expirationDate);

    // 5. Sending email to the user with the OTP
    await sendEmail(email, otp, saveOTP?.name);

    // 6. Sending a success message to the user
    return successMessageHandler(
      res,
      200,
      "OTP sent successfully. Please verify, it is valid for the next 2 minutes."
    );
  } catch (error) {
    // Passing the error to the next middleware (Application-level error handler)
    next(error);
  }
};
