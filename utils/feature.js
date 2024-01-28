const JWT = require("jsonwebtoken");

exports.sendCookie = (user, statusCode, res, message) => {
  const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true, //can access only backend not front end
      // expires: new Date(Date.now() + 60 * 1000),
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message,
      user,
      token
    });
};
