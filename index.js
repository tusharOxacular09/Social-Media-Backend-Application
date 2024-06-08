import express from "express";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import { welcomeMessageMiddleware } from "./src/middlewares/welcomeMessage.middleware.js";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandeler.middleware.js";
import { invalidRoutesHandlerMiddleware } from "./src/middlewares/invalidRoute.middleware.js";
import { userRouter } from "./src/features/users/routes/user.router.js";
import { postRouter } from "./src/features/posts/routes/post.router.js";
import { commentRouter } from "./src/features/comments/routes/comment.router.js";

const app = express();

// Global Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// Welcome message
app.get("/", welcomeMessageMiddleware);

// Routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

// Invalid Route Middleware
app.use(invalidRoutesHandlerMiddleware);

// Error Handeler Middleware
app.use(errorHandlerMiddleware);

export default app;
