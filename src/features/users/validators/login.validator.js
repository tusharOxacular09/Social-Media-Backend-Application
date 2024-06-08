import { body, validationResult } from "express-validator";
import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";

export const loginValidator = async (req, res, next) => {
  try {
    // Validating all fields
    const validateUser = [
      // Email validation: must be a valid email format
      body("email")
        .trim()
        .isEmail()
        .withMessage("Email is not valid")
        .normalizeEmail(),

      // Password validation: must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character
      body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
    ];

    // Asynchronously running each validation
    await Promise.all(
      validateUser.map((field) => {
        return field.run(req);
      })
    );

    // Sending validation errors
    let validationErrors = validationResult(req);
    // console.log(validationErrors);
    if (!validationErrors.isEmpty()) {
      throw new customErrorHandler(400, validationErrors.array()[0].msg);
    }

    // If all fields are correct
    next();
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};
