const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  // const { token } = req.cookies;
  // if (!token)
  //   return res.status(404).json({ success: false, message: "login first" });

  // const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
  // req.user = await userModel.findById(decoded._id); //attaching req.user for user details from DB
  // next();
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Login first" });
  }

  const token = authHeader.split(" ")[1];

  const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await userModel.findById(decoded._id);
  next();
};
