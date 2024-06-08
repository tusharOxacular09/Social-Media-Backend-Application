import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [1, "Content must be at least 1 character long"],
      maxlength: [500, "Content must be at most 500 characters long"],
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "Post ID is required"],
      validate: {
        validator: (value) => mongoose.Types.ObjectId.isValid(value),
        message: (props) => `${props.value} is not a valid ObjectId`,
      },
    },
  },
  {
    timestamps: true,
  }
);
