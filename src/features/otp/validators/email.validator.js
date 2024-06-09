import { body, validationResult } from "express-validator";
import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";

export const emailValidator = async (req, res, next) => {
  try {
    const validateUser = [
      // Email validation: must be a valid email format
      body("email")
        .trim()
        .isEmail()
        .withMessage("Email is not valid")
        .normalizeEmail(),
    ];

    // Ashynchronously running each validation
    await Promise.all(
      validateUser.map((field) => {
        return field.run(req);
      })
    );

    // Sending validation errors
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new customErrorHandler(400, validationErrors.array()[0].msg);
    }

    // If all fields are correct
    next();
  } catch (error) {
    next(error);
  }
};
