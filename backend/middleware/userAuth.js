import handleAsyncError from "./handleAsyncError.js";
import HandleError from "../utils/handleError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const verifyUserAuth = handleAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  // console.log("Token:", token);

  // Token missing or 'null' string
  if (!token || token === "null" || token === "undefined") {
    return next(
      new HandleError(
        "Authentication is missing! Please login to access resources",
        401
      )
    );
  }

  try {
    //  Verify only if token exists and is valid
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(" Decoded Data:", decodedData);

    req.user = await User.findById(decodedData.id);
    if (!req.user) {
      return next(new HandleError("User not found, please login again", 404));
    }

    next();
  } catch (error) {
    return next(
      new HandleError("Invalid or expired token! Please login again.", 401)
    );
  }
});

export const roleBasedaccess = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new HandleError("User authentication missing before role check", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new HandleError(
          `Role '${req.user.role}' is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};


