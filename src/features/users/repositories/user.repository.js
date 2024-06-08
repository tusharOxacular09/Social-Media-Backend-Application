import mongoose from "mongoose";
import { userSchema } from "../schemas/user.schema.js";
import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";
import bcrypt from "bcrypt";

// Creating User Model
const userModel = mongoose.model("users", userSchema);

export default class UserRepository {
  // Create New User
  static async createNewUser(user) {
    try {
      return await new userModel(user).save();
    } catch (error) {
      // If the input data is invalid
      if (error instanceof mongoose.Error.ValidationError) {
        throw new customErrorHandler(400, error.message);
      }
      throw new customErrorHandler(500, "Error while creating a new user.");
    }
  }

  // Validate User
  static async validateUser(email, password) {
    try {
      const user = await userModel.findOne({ email }).select("_id password");
      if (!user) {
        throw new customErrorHandler(
          404,
          "Invalid user credential, please provide correct email address."
        );
      }
      // Comparing the password using bcrypt
      const match = await bcrypt.compare(password, user.password);

      // If password didnot matches
      if (!match) {
        throw new customErrorHandler(
          404,
          "Invalid user credential, please provide correct password."
        );
      }

      // Returning the user to the controller
      return user._id;
    } catch (error) {
      if (error instanceof customErrorHandler) {
        throw new customErrorHandler(error.statusCode, error.message);
      }
      throw new customErrorHandler(500, "Error while validationg the user.");
    }
  }

  // Store Access Tokens
  static async storeAccessToken(userId, token) {
    try {
      // Saving the token
      await userModel.updateOne(
        { _id: userId },
        { $push: { accessTokens: token } }
      );
    } catch (error) {
      throw new customErrorHandler(
        500,
        "Error while storing the access token."
      );
    }
  }

  // Delete Access Token
  static async deleteAccessToken(userId, token) {
    try {
      // Deleting the token
      await userModel.updateOne(
        { _id: userId },
        { $pull: { accessTokens: token } }
      );
    } catch (error) {
      throw new customErrorHandler(
        500,
        "Error while deleting the access token."
      );
    }
  }

  // Delete All Access Token
  static async deleteAllAccessTokens(userId) {
    try {
      // Deleting all tokens
      await userModel.updateOne({ _id: userId }, { accessTokens: [] });
    } catch (error) {
      throw new customErrorHandler(
        500,
        "Error while deleting the access token."
      );
    }
  }

  // Validate Token
  static async validateToken(userId, token) {
    try {
      // Search the token
      const user = await userModel
        .findOne({
          _id: userId,
          accessTokens: token,
        })
        .select("_id");
      // Unauthorized user
      if (!user) {
        throw new customErrorHandler(
          401,
          "Invalid access token please login again."
        );
      }
    } catch (error) {
      if (error instanceof customErrorHandler) {
        throw new customErrorHandler(error.statusCode, error.message);
      }
      throw new customErrorHandler(500, "Error while validating access token.");
    }
  }

  // Get user details by user id
  static async getUserDetailsByUserId(userId) {
    try {
      // Validating the user id
      if (
        typeof userId !== "string" ||
        !mongoose.Types.ObjectId.isValid(userId)
      ) {
        throw new customErrorHandler(400, "Please provide valid user id.");
      }

      // Finding the user by user id
      const user = await userModel
        .findOne({
          _id: userId,
        })
        .select("name email gender");

      // If user id is not valid
      if (!user) {
        throw new customErrorHandler(400, "Invalid user id please try again.");
      }

      // return the userdetails
      return user;
    } catch (error) {
      console.log(error);
      if (error instanceof customErrorHandler) {
        throw new customErrorHandler(error.statusCode, error.message);
      }
      throw new customErrorHandler(500, "Error while getting user details.");
    }
  }

  // Get all user details
  static async getAllUserDetails() {
    try {
      // Finding the user by user id
      const users = await userModel.find({}).select("name email gender");

      // If user id is not valid
      if (!users) {
        throw new customErrorHandler(
          400,
          "Error while getting all user details."
        );
      }

      // return the userdetails
      return users;
    } catch (error) {
      if (error instanceof customErrorHandler) {
        throw new customErrorHandler(error.statusCode, error.message);
      }
      throw new customErrorHandler(500, "Error while getting user details.");
    }
  }

  // update user details by user id
  static async updateUserDetailsById(userId, data) {
    try {
      // Validating the user id
      if (
        typeof userId !== "string" ||
        !mongoose.Types.ObjectId.isValid(userId)
      ) {
        throw new customErrorHandler(400, "Please provide valid user id.");
      }

      // Finding the user by user id
      const user = await userModel.findByIdAndUpdate(userId, data, {
        new: true,
      });

      // If user id is not valid
      if (!user) {
        throw new customErrorHandler(400, "Invalid user id please try again.");
      }

      // return the userdetails
      return user;
    } catch (error) {
      if (error instanceof customErrorHandler) {
        throw new customErrorHandler(error.statusCode, error.message);
      }
      throw new customErrorHandler(500, "Error while updating user details.");
    }
  }
}
