import PostRepository from "../repositories/post.repository.js";
import { successMessageHandler } from "../../../middlewares/successMessage.middleware.js";

export const createPost = async (req, res, next) => {
  try {
    // Getting the details
    const userId = req.userId;
    const imageURL = req.imageURL;
    const caption = req.body.caption;

    // Creating a new post
    const newPost = await PostRepository.createPost(userId, caption, imageURL);

    // Sending Successful message to user
    return successMessageHandler(
      res,
      201,
      "Successfully created new post!",
      newPost
    );
  } catch (error) {
    next(error);
  }
};
