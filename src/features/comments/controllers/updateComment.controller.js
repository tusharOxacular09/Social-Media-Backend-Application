import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";
import { successMessageHandeler } from "../../../middlewares/successMessage.middleware.js";
import CommentRepository from "../repositories/comment.repository.js";

export const updateComment = async (req, res, next) => {
  try {
    // Getting the details
    const commentId = req.params.commentId;
    const content = req.body.content;

    if (!content) {
      throw new customErrorHandler(400, "Please provide the updated content.");
    }

    // Deleting the comment
    const updatedComment = await CommentRepository.updateCommentById(
      commentId,
      content
    );

    // Sending Successful message to user
    return successMessageHandeler(
      res,
      200,
      "Successfully updated the comment!",
      updatedComment
    );
  } catch (error) {
    next(error);
  }
};
