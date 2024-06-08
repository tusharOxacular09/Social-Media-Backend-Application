import { successMessageHandeler } from "../../../middlewares/successMessage.middleware.js";
import UserRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;

export const Register = async (req, res, next) => {
  try {
    const { password } = req.body;

    // First we have to hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await UserRepository.createNewUser({
      ...req.body,
      password: hashedPassword,
    });

    // Sending Successful message to the user
    return successMessageHandeler(
      res,
      201,
      "Successfully Registered!",
      newUser
    );
  } catch (error) {
    // Handeling the error by the application level error handeler
    next(error);
  }
};
