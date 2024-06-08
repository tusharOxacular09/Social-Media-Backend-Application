import { successMessageHandeler } from "../../../middlewares/successMessage.middleware.js";
import CommentRepository from "../repositories/comment.repository.js";

export const addComment = async (req, res, next) => {
  try {
    // Getting the details
    const postId = req.params.postId;
    const content = req.body.content;

    // Creating a new post
    const newComment = await CommentRepository.addComment(postId, content);

    // Sending Successful message to user
    return successMessageHandeler(
      res,
      201,
      "Successfully added new comment!",
      newComment
    );
  } catch (error) {
    next(error);
  }
};
