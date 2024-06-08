import { body, validationResult } from "express-validator";
import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";

export const registerValidator = async (req, res, next) => {
  try {
    const validateUser = [
      body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isAlpha("en-US", { ignore: " " })
        .withMessage("Name must contain only alphabetic characters and spaces")
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters"),

      // Email validation: must be a valid email format
      body("email")
        .trim()
        .isEmail()
        .withMessage("Email is not valid")
        .normalizeEmail(),

      // Password validation: must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character
      body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/\d/)
        .withMessage("Password must contain at least one number")
        .matches(/[@$!%*?&#]/)
        .withMessage("Password must contain at least one special character"),

      // Gender Validation
      body("gender")
        .trim()
        .notEmpty()
        .withMessage("Gender is required")
        .isString()
        .withMessage("Gender must be a string")
        .isIn(["Male", "Female", "Others"])
        .withMessage(
          "Gender must be one of the following: 'male', 'female', 'gender'"
        ),
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
