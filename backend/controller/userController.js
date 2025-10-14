import { json } from "express";
import handleAsyncError from "../middleware/handleAsyncError.js";
import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";


// To register user
export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is temp id",
      url: "This is temp id",
    },
  });
  // const token = user.getJWTToken();
  // res.status(200).json({
  //   success: true,
  //   user,
  //   token,
  // });
  // OR
  // Using helper function from utils folder
  sendToken(user, 201, res);
});

// Login
export const loginUser = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new HandleError("Email or password cannot be empty", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new HandleError("Invalid Email or password", 401));
  }
  const isPasswordValid = await user.verifyPassword(password);
  if (!isPasswordValid) {
    return next(new HandleError("Invalid Email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout
export const logout = handleAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expire: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Successfully Logged out",
  });
});

// Reset Password
export const requestPasswordReset = handleAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new HandleError("User doesn't exist", 400));
  }

  let resetToken;
  try {
    resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // console.log(" Reset Token:", resetToken);

    res.status(200).json({
      success: true,
      message: "Password reset token generated successfully",
      resetToken, // just for testing
    });
  } catch (error) {
    return next(
      new HandleError("Could not save reset token, Please try again later", 500)
    );
  }
  const resetPasswordURL = `http://localhost:8000/api/v1/reset/${resetToken}`;
  const message = `Use the following link to reset your password: ${resetPasswordURL}. \n\n This link will expire in 30 minutes. \n\n 
  If you didn't request a password reset, please ignore this message.`;
  try {
    // Send Email
    await sendEmail({
      email:user.email,
      subject:"Password Reset Request",
      message
    })
    res.status(200).json({
      success:true,
      message:`Email is sent to ${user.email} successfully`
    })
  }
   catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new HandleError("Email couldn't be sent, please try again later",500))
  }
});
