import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";
import { successMessageHandler } from "../../../middlewares/successMessage.middleware.js";
import UserRepository from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";

export const Logout = async (req, res, next) => {
  try {
    // 1. Getting the token from users cookies
    const token = req.cookies?.access_token;

    if (!token) {
      throw new customErrorHandler(404, "User is not loggedin yet.");
    }

    // 2. Getting the userId from the token
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decode?.userId;

    if (!userId) {
      throw new customErrorHandler(404, "User is not loggedin yet.");
    }

    // 3. Deleting the token from the user document
    await UserRepository.deleteAccessToken(userId, token);

    // 4. Clearing the cookie
    res.clearCookie("access_token");

    // 5. Sending Successful message to the user
    return successMessageHandler(res, 200, "Successfully Loggedout!");
  } catch (error) {
    // Handeling the error by the application level error handeler
    next(error);
  }
};

export const LogoutFromAllDevices = async (req, res, next) => {
  try {
    // 1. Getting the token from users cookies
    const token = req.cookies?.access_token;

    if (!token) {
      throw new customErrorHandler(404, "User is not loggedin yet.");
    }

    // 2. Getting the userId from the token
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decode?.userId;

    if (!userId) {
      throw new customErrorHandler(404, "User is not loggedin yet.");
    }

    // 3. Deleting the token from the user document
    await UserRepository.deleteAllAccessTokens(userId);

    // 4. Clearing the cookie
    res.clearCookie("access_token");

    // 5. Sending Successful message to the user
    return successMessageHandler(
      res,
      200,
      "Successfully Loggedout from all the devices!"
    );
  } catch (error) {
    // Handeling the error by the application level error handeler
    next(error);
  }
};
