import express from "express";
import "dotenv/config.js";
import { welcomeMessageMiddleware } from "./src/middlewares/welcomeMessage.middleware.js";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandeler.middleware.js";
import { invalidRoutesHandlerMiddleware } from "./src/middlewares/invalidRoute.middleware.js";

const app = express();

// Global Middlewares
app.use(express.json());

// Welcome message
app.get("/", welcomeMessageMiddleware);

// Routes

// Invalid Route Middleware
app.use(invalidRoutesHandlerMiddleware);

// Error Handeler Middleware
app.use(errorHandlerMiddleware);

export default app;
