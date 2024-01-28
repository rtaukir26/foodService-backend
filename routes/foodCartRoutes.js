const express = require("express");

const router = express.Router();

const {
  addToCart,
  getSingleCart,
  deleteCart,
} = require("../controllers/foodCartController");
const { isAuthenticated } = require("../middleware/auth");

//Add food to cart
router
  .route("/add/:id")
  .post(isAuthenticated, addToCart)
  .get(isAuthenticated, getSingleCart)
  .delete(isAuthenticated, deleteCart);

module.exports = router;
