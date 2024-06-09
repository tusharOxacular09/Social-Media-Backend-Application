import FriendsRepository from "../repositories/friends.repository.js";
import { successMessageHandler } from "../../../middlewares/successMessage.middleware.js";

export const toggleFriendship = async (req, res, next) => {
  try {
    const userId = req.userId;
    const friendId = req.params.friendId;

    // Toggle Friendship
    const newFriendship = await FriendsRepository.toggleFriendship(
      userId,
      friendId
    );

    // Returning Success Message
    return successMessageHandler(
      res,
      201,
      "Friend request toggeled successfully.",
      newFriendship
    );
  } catch (error) {
    next(error);
  }
};
