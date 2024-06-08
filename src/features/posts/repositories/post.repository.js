import mongoose from "mongoose";
import { postSchema } from "../schemas/post.schema.js";
import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";

// creating model
const postModel = mongoose.model("posts", postSchema);

export default class PostRepository {
  // Careate a new post
  static async createPost(userId, caption, imageURL) {
    try {
      const newPost = await postModel.create({
        postOwner: userId,
        caption,
        imageURL,
      });
      return newPost;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new customErrorHandler(400, error.message);
      }
      throw new customErrorHandler(500, "Error while creating new post.");
    }
  }

  // Get All Post
  static async getAllPost() {
    try {
      return await postModel.find({});
    } catch (error) {
      throw new customErrorHandler(500, "Error while getting all post.");
    }
  }

  // Get post by post id
  static async getPostByPostId(postId) {
    try {
      // validating posyt id
      if (
        typeof postId !== "string" ||
        !mongoose.Types.ObjectId.isValid(postId)
      ) {
        throw new customErrorHandler(400, "Please provide valid post id.");
      }
      return await postModel.findById(postId);
    } catch (error) {
      if (error instanceof customErrorHandler) {
        throw new customErrorHandler(error.statusCode, error.message);
      }
      throw new customErrorHandler(500, "Error while getting post by its id.");
    }
  }

  // Get al posts of an user
  static async getAllPostsOfAnUser(userId) {
    try {
      // validating posyt id
      if (
        typeof userId !== "string" ||
        !mongoose.Types.ObjectId.isValid(userId)
      ) {
        throw new customErrorHandler(400, "Please provide valid user id.");
      }
      return await postModel.find({ postOwner: userId });
    } catch (error) {
      if (error instanceof customErrorHandler) {
        throw new customErrorHandler(error.statusCode, error.message);
      }
      throw new customErrorHandler(
        500,
        "Error while getting all posts of the user."
      );
    }
  }

  // Delete post by post id
  static async deletePost(postId) {
    try {
      // validating posyt id
      if (
        typeof postId !== "string" ||
        !mongoose.Types.ObjectId.isValid(postId)
      ) {
        throw new customErrorHandler(400, "Please provide valid post id.");
      }
      await postModel.findByIdAndDelete(postId);
    } catch (error) {
      if (error instanceof customErrorHandler) {
        throw new customErrorHandler(error.statusCode, error.message);
      }
      throw new customErrorHandler(500, "Error while deleting post by its id.");
    }
  }

  // Update post by post id
  static async updatePostById(postId, updatedFields) {
    try {
      // validating posyt id
      if (
        typeof postId !== "string" ||
        !mongoose.Types.ObjectId.isValid(postId)
      ) {
        throw new customErrorHandler(400, "Please provide valid post id.");
      }

      // Updating posts
      return await postModel.findByIdAndUpdate(postId, updatedFields, {
        new: true,
      });
    } catch (error) {
      if (error instanceof customErrorHandler) {
        throw new customErrorHandler(error.statusCode, error.message);
      }
      throw new customErrorHandler(
        500,
        "Error while updating post by post id."
      );
    }
  }
}
