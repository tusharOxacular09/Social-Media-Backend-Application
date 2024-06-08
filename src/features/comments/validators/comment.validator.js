import mongoose from "mongoose";
import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";

export const commentValidator = async (req, res, next) => {
  try {
    // Validating the userId
    const userId = req.userId;
    if (!userId) {
      throw new customErrorHandler(400, "Invalid User Please Login Again.");
    }

    // validating post id
    const postId = req.params.postId;
    const content = req.body.content;
    if (
      typeof postId !== "string" ||
      !mongoose.Types.ObjectId.isValid(postId)
    ) {
      throw new customErrorHandler(400, "Please provide valid post id.");
    }

    if (!content) {
      throw new customErrorHandler(
        400,
        "Please provide content for the comment."
      );
    }

    // If all fields are correct
    next();
  } catch (error) {
    next(error);
  }
};
