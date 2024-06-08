import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";
import { postValidator } from "../validators/post.validator.js";
import { fileUploadMiddleware } from "../../../middlewares/fileUpload.middleware.js";
import { createPost } from "../controllers/createPost.controller.js";
import { getAllPost } from "../controllers/getAllPost.controller.js";
import { getPostByPostId } from "../controllers/getPostByPostId.controller.js";
import { getAllPostsOfAnUser } from "../controllers/getAllPostsOfAnUser.controller.js";
import { deletePost } from "../controllers/deletePost.controller.js";
import { updatePost } from "../controllers/updatePost.controller.js";
import { updatePostValidator } from "../validators/updatePost.validator.js";

// Initializing the router
const postRouter = Router();

postRouter
  .post(
    "/",
    authMiddleware,
    fileUploadMiddleware.single("imageURL"),
    postValidator,
    createPost
  )
  .get("/all", authMiddleware, getAllPost)
  .get("/:postId", authMiddleware, getPostByPostId)
  .get("/", authMiddleware, getAllPostsOfAnUser)
  .delete("/:postId", authMiddleware, deletePost)
  .put(
    "/:postId",
    authMiddleware,
    fileUploadMiddleware.single("imageURL"),
    updatePostValidator,
    updatePost
  );

export { postRouter };
