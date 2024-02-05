const mongoose = require("mongoose");
const foodCartModel = require("../models/foodCartModel");
const foodModel = require("../models/foodModel");

//add to cart - post
exports.addToCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const userId = req.user._id; // Assuming you have user information in the request

    // Check if Id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    let food = await foodModel.findById(req.params.id);

    if (!food)
      return res
        .status(404)
        .json({ success: false, message: "food not found" });

    // Check if the food item already exists in the cart
    let cartItem = await foodCartModel.findOneAndUpdate(
      { user: userId, cart: req.params.id }, //to find based on these two id
      { quantity: quantity }, //update the value
      { upsert: true, new: true } //if found then update else add/create
    );
    // .populate("user").populate('cart');

    res.status(200).json({
      success: true,
      message: "Data has retrieved successfully",
      food: cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in add food to cart",
      error: error.message,
    });
  }
};

//get All cart - get
exports.getAllCart = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user information in the request

    let food = await foodCartModel.find({ user: userId }); //to get specific user's food

    res.status(200).json({
      success: true,
      message: "Data has retrieved successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in single cart",
      error: error.message,
    });
  }
};

//single cart - get
exports.getSingleCart = async (req, res) => {
  try {
    // Check if Id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    let food = await foodCartModel.findById(req.params.id);

    if (!food)
      return res
        .status(404)
        .json({ success: false, message: "cart not found" });

    res.status(200).json({
      success: true,
      message: "Data has retrieved successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in single cart",
      error: error.message,
    });
  }
};

//delete cart - get
exports.deleteCart = async (req, res) => {
  try {
    // Check if Id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    let food = await foodCartModel.findByIdAndDelete(req.params.id);

    if (!food)
      return res
        .status(404)
        .json({ success: false, message: "cart not found" });

    res.status(200).json({
      success: true,
      message: "cart has been deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in delete cart",
      error: error.message,
    });
  }
};
