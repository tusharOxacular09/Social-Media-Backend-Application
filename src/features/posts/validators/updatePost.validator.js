import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";

export const updatePostValidator = async (req, res, next) => {
  try {
    // Validating the userId
    const userId = req.userId;
    if (!userId) {
      throw new customErrorHandler(400, "Invalid User Please Login Again.");
    }

    // Validating post id
    const postId = req.params.postId;
    if (!postId) {
      throw new customErrorHandler(400, "Post id is required.");
    }

    // validating updated fields
    const imageURL = req.imageURL;
    const caption = req.body.caption;
    if (!imageURL && !caption) {
      throw new customErrorHandler(400, "Please provide fields for updation.");
    }

    // If all fields are correct
    next();
  } catch (error) {
    next(error);
  }
};
