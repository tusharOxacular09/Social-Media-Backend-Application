import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";
import UserRepository from "../repositories/user.repository.js";
import { successMessageHandeler } from "../../../middlewares/successMessage.middleware.js";

export default class UserDetailsController {
  // 1. Get User Details By userId
  static async getUserDetails(req, res, next) {
    try {
      const userId = req.params.userId;
      if (!userId) {
        throw new customErrorHandler(400, "Please provide valid user id.");
      }

      // Find user details from document
      const userDetails = await UserRepository.getUserDetailsByUserId(userId);

      // returning successful message
      return successMessageHandeler(
        res,
        200,
        "Successfully getting user details!",
        userDetails
      );
    } catch (error) {
      next(error);
    }
  }

  // 2. Get All User Details By userId
  static async getAllUserDetails(req, res, next) {
    try {
      // Find user details from document
      const userDetails = await UserRepository.getAllUserDetails();

      // returning successful message
      return successMessageHandeler(
        res,
        200,
        "Successfully getting all user details!",
        userDetails
      );
    } catch (error) {
      next(error);
    }
  }

  // 3. Update User Details By userId
  static async updateUserDetails(req, res, next) {
    try {
      const userId = req.params.userId;

      // updating user details from document
      const updatedUserDetails = await UserRepository.updateUserDetailsById(
        userId,
        req.body
      );

      // returning successful message
      return successMessageHandeler(
        res,
        200,
        "Successfully updated user details!",
        updatedUserDetails
      );
    } catch (error) {
      next(error);
    }
  }
}
