import FriendsRepository from "../repositories/friends.repository.js";
import { successMessageHandler } from "../../../middlewares/successMessage.middleware.js";
import { validateMongoDbId } from "../validators/friends.validator.js";

export const getAllFriendsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    validateMongoDbId(userId, "user");

    // Getting All Friends
    const allFriends = await FriendsRepository.getAllFriendsByUserId(userId);

    // Returning Success Message
    return successMessageHandler(
      res,
      200,
      "Successfully getting all friends.",
      allFriends
    );
  } catch (error) {
    next(error);
  }
};
