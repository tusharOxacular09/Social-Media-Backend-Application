import mongoose from "mongoose";

// Friends Schema
export const friendsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    index: true,
    ref: "users",
  },
  friendId: {
    type: mongoose.Types.ObjectId,
    required: true,
    index: true,
    ref: "users",
  },
  status: {
    type: String,
    enum: ["pending", "rejected", "accepted"],
    default: "pending",
  },
});
