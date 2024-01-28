const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { sendCookie } = require("../utils/feature");

//Register - post
exports.registerUser = async (req, res) => {
  const { name, email, password, confirmPassword, mobileNumber } = req.body;
  try {
    if (!password)
      return res
        .status(404)
        .json({ success: false, message: "password required" });
    if (!confirmPassword)
      return res
        .status(404)
        .json({ success: false, message: "confirm password required" });
    if (password !== confirmPassword)
      return res.status(404).json({
        success: false,
        message: "confirm password should be same as password",
      });

    let user = await User.findOne({ email });

    if (user)
      return res
        .status(404)
        .json({ success: false, message: "user already exist" });

    const hashedPwd = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPwd,
      confirmPassword: hashedPwd,
      mobileNumber,
    });

    sendCookie(user, 201, res, "user registered successfully"); //send data to user
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in register user",
      error: error.message,
    });
  }
};

//Login - post
exports.login = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email }).select("+password");

  if (!user)
    return res
      .status(404)
      .json({ success: false, message: "Invalid email or password" });

  const isPwdMatch = await bcrypt.compare(password, user.password);
  if (!isPwdMatch)
    return res
      .status(404)
      .json({ success: false, message: "Invalid email or password" });

  sendCookie(user, 200, res, "user logged in successfully");
};

//Get user details - get
exports.getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    message: "data retrieved successfully",
    user: req.user,
  });
};

//Logout
exports.logout = async (req, res) => {
  res
    .cookie("token", null, {
      // httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({ success: true, message: "user logout successful" });
};
