import mongoose, { Schema } from "mongoose";

// Define the Like schema
export const likeSchema = new Schema(
  {
    isLiked: {
      type: Boolean,
      default: true,
    },
    targetId: {
      type: mongoose.Types.ObjectId,
      required: true,
      refPath: "targetModel",
    },
    targetModel: {
      type: String,
      required: true,
      enum: ["posts", "comments"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);
