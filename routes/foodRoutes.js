const express = require("express");
const {
  getAllFood,
  createFood,
  getSingleFood,
  userRating,
} = require("../controllers/foodContollers");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

//Create food - post - Admin/validation pending, is admin or not
router.post("/new", isAuthenticated, createFood);

//Get all foods
router.get("/all", isAuthenticated, getAllFood);
// router.get("/single-food/:id", isAuthenticated, getSingleFood);

//Get food details
router.route("/single-food/:id").get(isAuthenticated, getSingleFood);

//User rating/comments
router.post("/rating/:id", isAuthenticated, userRating);

//Add food to cart
// router.post("/add/:id", isAuthenticated, addToCart);

module.exports = router;
