export const invalidRoutesHandlerMiddleware = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Oops! The path ${req.originalUrl} with method ${req.method} is invalid. Please follow our api documentation on /api/docs`,
  });
  next();
};
