import { successMessageHandler } from "../../../middlewares/successMessage.middleware.js";
import UserRepository from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userCredential = await UserRepository.validateUser(email, password);

    // After Successful Login
    // 1. Token creation
    const token = jwt.sign(
      { userId: userCredential },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "2h",
      }
    );

    // 2. Storing the token in the database.
    await UserRepository.storeAccessToken(userCredential, token);

    // 3. Setting up the token in cookies
    res.cookie("access_token", token, {
      maxAge: 2 * 60 * 60 * 1000,
    });

    // 4. Sending Successful message to the user
    return successMessageHandler(res, 200, "Successfully LoggedIn!", token);
  } catch (error) {
    // Handeling the error by the application level error handeler
    next(error);
  }
};
