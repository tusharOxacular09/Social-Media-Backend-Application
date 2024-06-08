import UserRepository from "../features/users/repositories/user.repository.js";
import { customErrorHandler } from "./errorHandeler.middleware.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    // 1. Getting the token from users cookies
    const token = req.cookies?.access_token;

    if (!token) {
      throw new customErrorHandler(401, "User is not loggedin yet.");
    }

    // 2. Getting the userId from the token
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decode?.userId;

    if (!userId) {
      throw new customErrorHandler(401, "User is not loggedin yet.");
    }

    // 3. Checking the token in the user document
    await UserRepository.validateToken(userId, token);
    // Here if the token is invalid the repository throws the error.

    // 4. If Token is validated set the user id to the request
    req.userId = userId;

    // 5. Next Middleware
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Token Provided." });
    }
    next(error);
  }
};
