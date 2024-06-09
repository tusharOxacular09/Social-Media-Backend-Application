import PostRepository from "../repositories/post.repository.js";
import { successMessageHandler } from "../../../middlewares/successMessage.middleware.js";

export const updatePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const imageURL = req.imageURL;
    const caption = req.body.caption;
    
    // Updated fields
    const updatedFields = {};
    if (imageURL) {
      updatedFields["imageURL"] = imageURL;
    }
    if (caption) {
      updatedFields["caption"] = caption;
    }

    // Deleting the posts
    const updatedPost = await PostRepository.updatePostById(
      postId,
      updatedFields
    );

    // Sending Successful message to user
    return successMessageHandler(
      res,
      200,
      "Successfully updated the post!",
      updatedPost
    );
  } catch (error) {
    next(error);
  }
};
