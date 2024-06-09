import LikeRepository from "../repositories/like.repository.js";
import { successMessageHandler } from "../../../middlewares/successMessage.middleware.js";

export const getAllLikes = async (req, res, next) => {
  try {
    const targetId = req.params.id;

    // Toggling the Like
    const allLikes = await LikeRepository.getAllLikes(targetId);

    return successMessageHandler(
      res,
      200,
      "Successfully getting all likes.",
      allLikes
    );
  } catch (error) {
    next(error);
  }
};
