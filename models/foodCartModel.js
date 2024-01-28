const mongoose = require("mongoose");

const foodAddToCart = new mongoose.Schema(
  {
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "allFood",
      required: true,
    }, // Reference to the food item
    quantity: { type: Number, default: 1 }, // Quantity of the food item
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    }, // Reference to the user adding to the cart
  },
  { timestamps: true }
);

module.exports = mongoose.model("foodAddToCart", foodAddToCart);
