import "dotenv/config.js";
import app from "./index.js";
import { mongoDbConnector } from "./src/config/mongodb.config.js";

// Listening the server on desired port
app.listen(process.env.PORT, async () => {
  // Logging the Successfull Setup of server
  console.log(
    `Social networking server is running on port ${process.env.PORT} 🚀.`
  );
  // Connectiong to mongoDB database
  await mongoDbConnector();
});
