const express = require("express");

const router = express.Router();

const {
  addToCart,
  getSingleCart,
  deleteCart,
  getAllCart,
} = require("../controllers/foodCartController");
const { isAuthenticated } = require("../middleware/auth");

//Get all cart food
router.get("/all-cart", isAuthenticated, getAllCart);

//Add/single/delete food from cart
router
  .route("/add/:id")
  .post(isAuthenticated, addToCart)
  .get(isAuthenticated, getSingleCart)
  .delete(isAuthenticated, deleteCart);

module.exports = router;
