import PostRepository from "../repositories/post.repository.js";
import { successMessageHandeler } from "../../../middlewares/successMessage.middleware.js";

export const getAllPost = async (req, res, next) => {
  try {
    // Getting all posts
    const allPosts = await PostRepository.getAllPost();

    // Sending Successful message to user
    return successMessageHandeler(
      res,
      200,
      "Successfully getting all posts!",
      allPosts
    );
  } catch (error) {
    next(error);
  }
};
