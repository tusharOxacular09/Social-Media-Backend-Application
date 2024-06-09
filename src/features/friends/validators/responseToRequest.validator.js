import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";
import { validateMongoDbId } from "./friends.validator.js";

export const responeToRequestValidator = async (req, res, next) => {
  try {
    // Validating the userId
    const userId = req.userId;
    validateMongoDbId(userId, "user");

    // Validating post id
    const friendId = req.params.friendId;
    validateMongoDbId(friendId, "friend");

    // response validator
    const response = req.query.response;
    if (!res || !["accepted", "rejected"].includes(response)) {
      throw new customErrorHandler(
        400,
        "Please provide a valid response from accepted or rejected."
      );
    }

    // If all fields are correct
    next();
  } catch (error) {
    next(error);
  }
};
