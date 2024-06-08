import mongoose from "mongoose";
import { commentSchema } from "../schemas/comment.schema.js";
import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";

// craeting model
const commentModel = mongoose.model("comments", commentSchema);

export default class CommentRepository {
  // Add a new comment
  static async addComment(postId, content) {
    try {
      // creating new comment
      return await commentModel.create({ postId, content });
    } catch (error) {
      if (
        error instanceof mongoose.Error.ValidationError ||
        error instanceof customErrorHandler
      ) {
        throw new customErrorHandler(400, error.message);
      }
      throw new customErrorHandler(500, "Error while adding new comment.");
    }
  }

  // Get all comments
  static async getAllcomments(postId) {
    try {
      // Comment Id validation
      if (
        typeof postId !== "string" ||
        !mongoose.Types.ObjectId.isValid(postId)
      ) {
        throw new customErrorHandler(400, "Please provide valid post id.");
      }

      // creating new comment
      return await commentModel.find({ postId });
    } catch (error) {
      if (error instanceof customErrorHandler) {
        throw new customErrorHandler(400, error.message);
      }
      throw new customErrorHandler(500, "Error while adding new comment.");
    }
  }

  // Delete Comment By Id
  static async deleteCommentById(commentId) {
    try {
      // Comment Id validation
      if (
        typeof commentId !== "string" ||
        !mongoose.Types.ObjectId.isValid(commentId)
      ) {
        throw new customErrorHandler(400, "Please provide valid post id.");
      }

      // deleting the comment
      await commentModel.findByIdAndDelete(commentId);
    } catch (error) {
      if (error instanceof customErrorHandler) {
        throw new customErrorHandler(400, error.message);
      }
      throw new customErrorHandler(500, "Error while deleting the comment.");
    }
  }

  // Update Comment By Id
  static async updateCommentById(commentId, content) {
    try {
      // comment Id validation
      if (
        typeof commentId !== "string" ||
        !mongoose.Types.ObjectId.isValid(commentId)
      ) {
        throw new customErrorHandler(400, "Please provide valid post id.");
      }

      // Update the comment
      return await commentModel.findByIdAndUpdate(
        commentId,
        { content },
        { new: true }
      );
    } catch (error) {
      if (error instanceof customErrorHandler) {
        throw new customErrorHandler(400, error.message);
      }
      throw new customErrorHandler(500, "Error while deleting the comment.");
    }
  }
}
