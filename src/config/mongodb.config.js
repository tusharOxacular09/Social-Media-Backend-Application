import mongoose from "mongoose";

export const mongoDbConnector = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("MongoDB Connected Successfully 😎.");
      })
      .catch((error) => {
        console.log("Error while connecting to mongoDB database 😔.", error);
      });
  } catch (error) {
    console.log("Error while connecting to mongoDB database 😔.", error);
  }
};
