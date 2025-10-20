import { json } from "express";
import handleAsyncError from "../middleware/handleAsyncError.js";
import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
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

// Forgot Password
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
  } catch (error) {
    // console.log(error)
    return next(
      new HandleError("Could not save reset token, Please try again later", 500)
    );
  }

  const resetPasswordURL = `http://localhost:8000/api/v1/reset/${resetToken}`;
  const message = `Use the following link to reset your password: ${resetPasswordURL}. 
This link will expire in 30 minutes. 
If you didn't request a password reset, please ignore this message.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new HandleError("Email couldn't be sent, please try again later", 500)
    );
  }
});

// Reset Password
export const resetPassword = handleAsyncError(async (req, res, next) => {
  console.log(req.params.token);
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
    // gt->if time greater than current time -> token will be valid
  });
  if (!user) {
    return next(
      new HandleError("Invalid or expired password reset token", 400)
    );
  }
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new HandleError("Password doesn't not match", 400));
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

// Get User Details
export const getUserDetails = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Password
export const updateUserPassword = handleAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");
  const checkPasswordMatch = await user.verifyPassword(oldPassword);
  if (!checkPasswordMatch) {
    return next(new HandleError("Old password is incorrect", 400));
  }
  if (newPassword !== confirmNewPassword) {
    return next(new HandleError("New passwords do not match", 400));
  }
  user.password = newPassword;
  await user.save();
  sendToken(user, 200, res);
});

// Update User Profile
export const updateProfile = handleAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  const updateUserDetails = {
    name,
    email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, updateUserDetails, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

// Admin Getting user information
export const getUsersList = handleAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});
// Admin Getting single user information
export const getSingleUser = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new HandleError(`User doesn't exist with this id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// Admin changing user role
export const updateUserRole = handleAsyncError(async (req, res, next) => {
  const { role } = req.body;
  const newUserData = {
    role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new HandleError(`User doesn't exist`, 400));
  }
  res.status(200).json({
    success: true,
    message: "User role updated successfully",
    user,
  });
});

// Admin - Delete User Profile
export const deleteUser = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new HandleError(`User doesn't exist with this id: ${req.params.id}`, 404)
    );
  }

  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
