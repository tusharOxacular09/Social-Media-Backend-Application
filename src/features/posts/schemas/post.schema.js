import mongoose, { Schema } from "mongoose";

export const postSchema = new Schema(
  {
    imageURL: {
      type: String,
      required: [true, "Image URL is required"],
    },
    caption: {
      type: String,
      required: [true, "Caption is required"],
      minlength: [10, "Caption must be at least 10 characters long"],
      maxlength: [200, "Caption must be at most 200 characters long"],
    },
    postOwner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Post owner is required"],
      index: true,
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
