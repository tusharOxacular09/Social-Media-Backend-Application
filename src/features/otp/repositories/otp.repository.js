import mongoose from "mongoose";
import { otpSchema } from "../schemas/otp.schema.js";
import { userSchema } from "../../users/schemas/user.schema.js";
import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";

// Models
const otpModel = mongoose.model("otps", otpSchema);
const userModel = mongoose.model("users", userSchema);

export default class OtpRepository {
  /**
   * Add an OTP to the database for the given email.
   *
   * @param {string} email - The email of the user to which the OTP will be sent.
   * @param {number} otp - The generated OTP.
   * @param {Date} expiaryDate - The expiration date of the OTP.
   * @returns {Promise<Object>} - A promise that resolves to the user document (without the _id).
   * @throws {customErrorHandler} If there is an error while adding the OTP.
   */
  static async addOTP(email, otp, expiaryDate) {
    try {
      // 1. Finding if the user with the provided email exists
      const user = await userModel.findOne({ email }).select("-_id name");
      if (!user) {
        throw new customErrorHandler(
          404,
          "Invalid email, please provide the registered email!"
        );
      }

      // 2. Inserting the OTP into the OTP collection
      await otpModel.create({
        email,
        otp,
        expiaryDate,
      });

      // 3. Returning the user document to get the user's name for use in the email
      return user;
    } catch (error) {
      if (error instanceof customErrorHandler) {
        throw new customErrorHandler(error.statusCode, error.message);
      }
      throw new customErrorHandler(500, "Error while adding the OTP.");
    }
  }

  /**
   * Verify an OTP for the given email.
   *
   * @param {string} email - The email of the user.
   * @param {number} otp - The OTP to be verified.
   * @returns {Promise<void>} - A promise that resolves to void if the OTP is valid.
   * @throws {customErrorHandler} If there is an error during OTP verification.
   */
  static async verifyOtp(email, otp) {
    try {
      // 1. Finding the OTP document that matches the provided email and OTP
      const checkOTP = await otpModel.findOne({ email, otp });
      if (!checkOTP) {
        throw new customErrorHandler(404, "Invalid email or OTP provided!");
      }

      // 2. Checking if the OTP has expired
      const currentDate = new Date();
      if (!checkOTP?.expiaryDate || checkOTP.expiaryDate < currentDate) {
        throw new customErrorHandler(
          400,
          "This OTP has expired, please try again."
        );
      }

      // If OTP is valid and not expired, it is successfully verified.
      // Perform any additional actions as needed here (e.g., marking OTP as used).
      // deleting the document
      await otpModel.deleteOne({ email, otp });
    } catch (error) {
      if (error instanceof customErrorHandler) {
        throw new customErrorHandler(error.statusCode, error.message);
      }
      // Catch any unexpected errors and throw a custom error
      throw new customErrorHandler(500, "Error while verifying the OTP.");
    }
  }

  /**
   * Reset the password for a user with the given email.
   *
   * @param {string} email - The email of the user whose password needs to be reset.
   * @param {string} password - The new password to set for the user.
   * @returns {Promise<void>} - A promise that resolves to void if the password is successfully reset.
   * @throws {customErrorHandler} If there is an error during the password reset process.
   */
  static async resetPassword(email, password) {
    try {
      // 1. Finding the user by email and updating the password
      const updatedUser = await userModel.findOneAndUpdate(
        { email },
        { password },
        { new: true }
      );

      // 2. If no user is found, throw a custom error indicating the email is invalid
      if (!updatedUser) {
        throw new customErrorHandler(400, "Invalid email, please try again.");
      }
    } catch (error) {
      // 3. If the error is a custom error, rethrow it
      if (error instanceof customErrorHandler) {
        throw new customErrorHandler(error.statusCode, error.message);
      }
      // 4. Catch any unexpected errors and throw a custom error
      throw new customErrorHandler(500, "Error while resetting the password.");
    }
  }
}
