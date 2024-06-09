import OtpRepository from "../repositories/otp.repository.js";
import { successMessageHandler } from "../../../middlewares/successMessage.middleware.js";
import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;

/**
 * Reset the user's password.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export const resetPassword = async (req, res, next) => {
  try {
    // 1. Extracting email and password from request body
    const { email, password } = req.body;

    // 2. Hashing the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // 3. Reset password
    await OtpRepository.resetPassword(email, hashedPassword);

    // 4. Sending a success message to the user
    return successMessageHandler(res, 200, "Password updated successfully.");
  } catch (error) {
    // Passing the error to the next middleware (Application-level error handler)
    next(error);
  }
};
