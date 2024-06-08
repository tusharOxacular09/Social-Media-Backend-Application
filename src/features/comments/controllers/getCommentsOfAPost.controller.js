import { successMessageHandeler } from "../../../middlewares/successMessage.middleware.js";
import CommentRepository from "../repositories/comment.repository.js";

export const getCommentsOfAPost = async (req, res, next) => {
  try {
    // Getting the details
    const postId = req.params.postId;

    // Getting all comments
    const allComments = await CommentRepository.getAllcomments(postId);

    // Sending Successful message to user
    return successMessageHandeler(
      res,
      200,
      "Successfully getting all comments!",
      allComments
    );
  } catch (error) {
    next(error);
  }
};
