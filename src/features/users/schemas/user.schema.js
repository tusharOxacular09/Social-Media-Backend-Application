import { Schema } from "mongoose";

export const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name must be at most 50 characters"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s]*$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid name! Name must contain only alphabetic characters and spaces`,
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    maxlength: [128, "Password must be at most 128 characters long"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: {
      values: ["Male", "Female", "Others"],
      message: "Gender must be either Male, Female, or Others",
    },
  },
  accessTokens: [String],
});
