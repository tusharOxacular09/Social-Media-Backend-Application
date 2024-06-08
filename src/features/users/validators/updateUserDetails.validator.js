import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";

export const updateUserDetailsValidator = (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      throw new customErrorHandler(400, "Please provide valid user id.");
    }

    if (!Object.keys(req.body).length) {
      throw new customErrorHandler(400, "Please provide updating parameters.");
    }

    if (Object.keys(req.body).includes("password")) {
      throw new customErrorHandler(400, "Password can't be updated directly.");
    }

    if (Object.keys(req.body).includes("_id")) {
      throw new customErrorHandler(400, "User Id can't be updated directly.");
    }

    if (Object.keys(req.body).includes("accessTokens")) {
      throw new customErrorHandler(
        400,
        "Access tokens can't be updated directly."
      );
    }

    // If there is no validation error
    next();
  } catch (error) {
    next(error);
  }
};
