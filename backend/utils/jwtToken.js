export const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // cookie options
  const options = {
    expires: new Date(  
      Date.now() + process.env.EXPIRE_COOKIE * 24 * 60 * 60 * 1000
    ), // multiply BEFORE creating Date
    httpOnly: true, // can only be accessed by server
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
