import HandleError from "../utils/handleError.js";

// error-handling middleware
const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //  to handle mongodb error (id error)
  if (err.name === "CastError") {
    const message = `This is invalid resource ${err.path}`;
    err = new HandleError(message, 404);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `This ${Object.keys(
      err.keyValue
    )}:already registered. Please login to continue`;
    err = new HandleError(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
