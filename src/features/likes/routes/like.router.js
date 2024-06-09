import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";
import { likeValidator } from "../validators/like.validator.js";
import { toggleLike } from "../controller/toggleLike.controller.js";
import { getAllLikes } from "../controller/getAllLikes.controller.js";

// like router
const likeRouter = Router();

likeRouter
  .post("/toggle/:id", authMiddleware, likeValidator, toggleLike)
  .get("/:id", authMiddleware, getAllLikes);

export { likeRouter };
