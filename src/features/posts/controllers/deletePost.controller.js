import PostRepository from "../repositories/post.repository.js";
import { successMessageHandeler } from "../../../middlewares/successMessage.middleware.js";
import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";

export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    if (!postId) {
      throw new customErrorHandler(400, "Post id is required.");
    }
    // Deleting the posts
    await PostRepository.deletePost(postId);

    // Sending Successful message to user
    return successMessageHandeler(res, 200, "Successfully deleted the post!");
  } catch (error) {
    next(error);
  }
};
