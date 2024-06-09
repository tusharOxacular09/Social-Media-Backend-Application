import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";
import mongoose from "mongoose";

export const friendsValidator = async (req, res, next) => {
  try {
    // Validating the userId
    const userId = req.userId;
    validateMongoDbId(userId, "user");

    // Validating post id
    const friendId = req.params.friendId;
    validateMongoDbId(friendId, "friend");

    // If all fields are correct
    next();
  } catch (error) {
    next(error);
  }
};

export const validateMongoDbId = (id, name) => {
  if (!id || typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
    throw new customErrorHandler(400, `Please provide valid ${name} id.`);
  }
};
