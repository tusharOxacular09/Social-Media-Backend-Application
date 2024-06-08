export const successMessageHandeler = (response, statusCode, message, data) => {
  try {
    // Sending the response
    response.status(statusCode).json({
      success: true,
      message: `🎉${message}🎉`,
      ...(data && { data: data }),
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "😔 Oops! Something went wrong... Please try again later! 😔",
    });
  }
};
