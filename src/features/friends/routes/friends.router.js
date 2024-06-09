import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";
import { friendsValidator } from "../validators/friends.validator.js";
import { toggleFriendship } from "../controller/toggleFriendship.controller.js";
import { getAllFriendsByUserId } from "../controller/getAllFriendsByUserId.controller.js";
import { getAllPendingRequest } from "../controller/getAllPendingRequests.controller.js";
import { responeToRequestValidator } from "../validators/responseToRequest.validator.js";
import { respondToFriendRequest } from "../controller/responseToRequest.controller.js";

const friendsRouter = Router();

friendsRouter
  .get(
    "/toggle-friendship/:friendId",
    authMiddleware,
    friendsValidator,
    toggleFriendship
  )
  .get("/get-friends/:userId", authMiddleware, getAllFriendsByUserId)
  .get("/get-pending-requests", authMiddleware, getAllPendingRequest)
  .get(
    "/response-to-request/:friendId",
    authMiddleware,
    responeToRequestValidator,
    respondToFriendRequest
  );

export { friendsRouter };
