export const welcomeMessageMiddleware = (req, res) => {
  return res.status(200).json({
    success: true,
    message:
      "🚀 Welcome to your Social Media! Let's connect and share great moments! 🚀",
  });
};
