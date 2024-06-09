import mongoose from "mongoose";
import { likeSchema } from "../schemas/like.schema.js";
import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";
import { successMessageHandler } from "../../../middlewares/successMessage.middleware.js";

// creating like model
const likeModel = mongoose.model("likes", likeSchema);

export default class LikeRepository {
  // Toggle Like
  static async toggleLike(targetId, userId, targetModel) {
    try {
      const like = await likeModel.findOne({ targetId, userId, targetModel });

      if (like) {
        like.isLiked = !like.isLiked;
        await like.save();
        return like;
      } else {
        const newLike = await likeModel.create({
          targetId,
          targetModel,
          userId,
        });
        return newLike;
      }
    } catch (error) {
      throw new customErrorHandler(500, "Error while toggling the like.");
    }
  }

  // Get All Likes
  static async getAllLikes(targetId) {
    try {
      if (!targetId || !mongoose.Types.ObjectId.isValid(targetId)) {
        throw new customErrorHandler(500, "Please provide valid target id.");
      }
      const allLikes = await likeModel.find({ targetId });

      return allLikes;
    } catch (error) {
      if (error instanceof customErrorHandler) {
        throw new customErrorHandler(error.statusCode, error.message);
      }
      throw new customErrorHandler(500, "Error while toggling the like.");
    }
  }
}
