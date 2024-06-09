import mongoose from "mongoose";
import { friendsSchema } from "../schemas/friends.schema.js";
import { customErrorHandler } from "../../../middlewares/errorHandeler.middleware.js";

const friendsModel = mongoose.model("friends", friendsSchema);

export default class FriendsRepository {
  /**
   * Toggle the friendship status between two users.
   * If a friendship already exists, it updates the status to "pending".
   * If no friendship exists, it creates a new friendship with "pending" status.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} friendId - The ID of the friend.
   * @returns {Promise<Object>} The friendship document.
   * @throws {customErrorHandler} If there is an error while toggling the friendship.
   */
  static async toggleFriendship(userId, friendId) {
    try {
      // Check if a friendship already exists between the two users
      const findFriendship = await friendsModel.findOne({ userId, friendId });

      if (findFriendship) {
        // If friendship exists, update its status to "pending"
        findFriendship.status = "pending";
        await findFriendship.save();
        return findFriendship;
      } else {
        // If no friendship exists, create a new friendship with "pending" status
        const newFriendship = await friendsModel.create({
          userId,
          friendId,
          status: "pending",
        });

        return newFriendship;
      }
    } catch (error) {
      // Handle any errors that occur during the process
      throw new customErrorHandler(500, "Error while toggling the friendship.");
    }
  }

  /**
   * Get all friends of a user whose status is "accepted".
   *
   * @param {string} userId - The ID of the user.
   * @returns {Promise<Object[]>} A promise that resolves to an array of friend documents.
   * @throws {customErrorHandler} If there is an error while retrieving the friendships.
   */
  static async getAllFriendsByUserId(userId) {
    try {
      // Retrieve all friends of the user with status "accepted"
      const allFriends = await friendsModel.find({
        $or: [{ userId: userId }, { friendId: userId }],
        status: "accepted",
      });

      // Check if any friends are found
      if (allFriends && allFriends.length) {
        return allFriends;
      } else {
        // If no friends are found, throw a custom error with a 404 status code
        throw new customErrorHandler(
          404,
          "Sorry! Currently there are no active friends."
        );
      }
    } catch (error) {
      // If the error is an instance of customErrorHandler, rethrow it with the same status and message
      if (error instanceof customErrorHandler) {
        throw new customErrorHandler(error.statusCode, error.message);
      }
      // For any other errors, throw a custom error with a 500 status code
      throw new customErrorHandler(500, "Error while retrieving friendships.");
    }
  }

  /**
   * Get all pending friend requests for a user.
   *
   * @param {string} userId - The ID of the user.
   * @returns {Promise<Object[]>} A promise that resolves to an array of pending friend request documents.
   * @throws {customErrorHandler} If there is an error while retrieving the pending friend requests.
   */
  static async getAllPendingRequest(userId) {
    try {
      // Retrieve all pending friend requests of the user
      const allPendingRequest = await friendsModel.find({
        userId,
        status: "pending",
      });

      // Return the list of pending friend requests
      return allPendingRequest;
    } catch (error) {
      // Handle any errors that occur during the process by throwing a custom error
      throw new customErrorHandler(
        500,
        "Error while retrieving pending friend requests."
      );
    }
  }

  /**
   * Respond to a friend request by updating its status.
   *
   * @param {string} userId - The ID of the user responding to the friend request.
   * @param {string} friendId - The ID of the user who sent the friend request.
   * @param {string} response - The response to the friend request (e.g., "accepted" or "rejected").
   * @returns {Promise<Object>} A promise that resolves to the updated friend request document.
   * @throws {customErrorHandler} If there is an error while updating the friend request.
   */
  static async respondToFriendRequest(userId, friendId, response) {
    try {
      // Find the pending friend request and update its status with the response
      const updatedFriendRequest = await friendsModel.findOneAndUpdate(
        {
          friendId: userId,
          userId: friendId,
        },
        { status: response },
        { new: true } // Return the updated document
      );

      if (!updatedFriendRequest) {
        throw new customErrorHandler(404, "Invalid Friend request!");
      }

      // Return the updated friend request document
      return updatedFriendRequest;
    } catch (error) {
      if (error instanceof customErrorHandler) {
        throw new customErrorHandler(error.statusCode, error.message);
      }
      // Handle any errors that occur during the process by throwing a custom error
      throw new customErrorHandler(
        500,
        "Error while responding to the friend request."
      );
    }
  }
}
