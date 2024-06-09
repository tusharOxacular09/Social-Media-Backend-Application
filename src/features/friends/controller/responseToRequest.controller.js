import FriendsRepository from "../repositories/friends.repository.js";
import { successMessageHandler } from "../../../middlewares/successMessage.middleware.js";

/**
 * Respond to a friend request by updating its status.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves to void.
 * @throws {customErrorHandler} If there is an error while updating the friend request.
 */
export const respondToFriendRequest = async (req, res, next) => {
  try {
    const userId = req.userId; // Extracting the user ID from the request
    const friendId = req.params.friendId; // Extracting the friend ID from the request parameters
    const response = req.query.response; // Extracting the response from the query parameters

    // Respond to the friend request using the FriendsRepository method
    const responseToRequest = await FriendsRepository.respondToFriendRequest(
      userId,
      friendId,
      response
    );

    // Returning a success message with the updated friend request document
    return successMessageHandler(
      res,
      200,
      `Successfully ${response} the friend request.`,
      responseToRequest
    );
  } catch (error) {
    // Passing any errors to the next middleware function
    next(error);
  }
};
