import FriendsRepository from "../repositories/friends.repository.js";
import { successMessageHandler } from "../../../middlewares/successMessage.middleware.js";
import { validateMongoDbId } from "../validators/friends.validator.js";

export const getAllPendingRequest = async (req, res, next) => {
  try {
    const userId = req.userId;
    validateMongoDbId(userId, "user");

    // Getting All Friends
    const allPendingRequests = await FriendsRepository.getAllPendingRequest(
      userId
    );

    // Returning Success Message
    if (allPendingRequests?.length) {
      return successMessageHandler(
        res,
        200,
        "Successfully getting all pending requests.",
        allPendingRequests
      );
    }

    return successMessageHandler(
      res,
      200,
      "Greate there are no pending requests."
    );
  } catch (error) {
    next(error);
  }
};
