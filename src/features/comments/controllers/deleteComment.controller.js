import { successMessageHandler } from "../../../middlewares/successMessage.middleware.js";
import CommentRepository from "../repositories/comment.repository.js";

export const deleteComment = async (req, res, next) => {
  try {
    // Getting the details
    const commentId = req.params.commentId;

    // Deleting the comment
    await CommentRepository.deleteCommentById(commentId);

    // Sending Successful message to user
    return successMessageHandler(
      res,
      200,
      "Successfully deleted the comment!"
    );
  } catch (error) {
    next(error);
  }
};
