import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";
import { addComment } from "../controllers/addComment.controller.js";
import { commentValidator } from "../validators/comment.validator.js";
import { getCommentsOfAPost } from "../controllers/getCommentsOfAPost.controller.js";
import { deleteComment } from "../controllers/deleteComment.controller.js";
import { updateComment } from "../controllers/updateComment.controller.js";

const commentRouter = Router();

commentRouter
  .post("/:postId", authMiddleware, commentValidator, addComment)
  .get("/:postId", authMiddleware, getCommentsOfAPost)
  .delete("/:commentId", authMiddleware, deleteComment)
  .put("/:commentId", authMiddleware, updateComment);

export { commentRouter };
