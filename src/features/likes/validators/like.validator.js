import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";
import mongoose from "mongoose";

export const likeValidator = async (req, res, next) => {
  try {
    // Validating the userId
    const userId = req.userId;
    if (!userId) {
      throw new customErrorHandler(400, "Invalid User Please Login Again.");
    }

    // Validating post id
    const targetId = req.params.id;
    if (
      !targetId ||
      typeof targetId !== "string" ||
      !mongoose.Types.ObjectId.isValid(targetId)
    ) {
      throw new customErrorHandler(400, "Please provide valid target id.");
    }

    // validating type
    const targetType = req.query.type;
    if (!targetType || !["posts", "comments"].includes(targetType)) {
      throw new customErrorHandler(
        400,
        "Please provide valid target type from posts or comments"
      );
    }

    // If all fields are correct
    next();
  } catch (error) {
    next(error);
  }
};
