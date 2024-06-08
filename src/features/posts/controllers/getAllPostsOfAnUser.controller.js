import PostRepository from "../repositories/post.repository.js";
import { successMessageHandeler } from "../../../middlewares/successMessage.middleware.js";
import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";

export const getAllPostsOfAnUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new customErrorHandler(
        401,
        "Invalid user credential, Please login again."
      );
    }
    // Getting all posts
    const allPost = await PostRepository.getAllPostsOfAnUser(userId);

    // Sending Successful message to user
    return successMessageHandeler(
      res,
      200,
      "Successfully getting all posts!",
      allPost
    );
  } catch (error) {
    next(error);
  }
};
