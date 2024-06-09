import LikeRepository from "../repositories/like.repository.js";
import { successMessageHandler } from "../../../middlewares/successMessage.middleware.js";

export const toggleLike = async (req, res, next) => {
  try {
    const targetId = req.params.id;
    const targetType = req.query.type;
    const userId = req.userId;

    // Toggling the Like
    const like = await LikeRepository.toggleLike(targetId, userId, targetType);

    return successMessageHandler(
      res,
      201,
      "Successfully Toggeled the Like.",
      like
    );
  } catch (error) {
    next(error);
  }
};
