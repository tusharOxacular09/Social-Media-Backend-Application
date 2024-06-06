export class customErrorHandler extends Error {
  constructor(statusCode, errMessage) {
    super(errMessage);
    this.statusCode = statusCode;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof customErrorHandler) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // logging the error in console
  console.log(err);

  return res.status(500).json({
    success: false,
    message: "Oops! Something went wrong... Please try again later!",
  });
};
