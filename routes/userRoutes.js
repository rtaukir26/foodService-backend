const express = require("express");
const {
  registerUser,
  login,
  logout,
  getMyProfile,
} = require("../controllers/userControllers");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

//Register
router.post("/register", registerUser);
//Login
router.post("/login", login);
//User details
router.get("/my-profile", isAuthenticated, getMyProfile);
//Logout
router.get("/logout", logout);

module.exports = router;
