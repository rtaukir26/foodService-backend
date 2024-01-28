const mongoose = require("mongoose");
const foodModel = require("../models/foodModel");
// const cartModel = require("../models/foodAddToCart");
const { checkUserExist } = require("../utils/isUserExist");

//Create food - post
exports.createFood = async (req, res) => {
  try {
    const { name, price, description, category, photo, rating, reviews } =
      req.body;

    let food = await foodModel.create({
      name,
      price,
      description,
      category,
      rating,
      reviews,
      user: req.user,
    });

    res.status(200).json({
      success: false,
      message: "fodd has created successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in create food",
      error: error.message,
    });
  }
};

//Get all food - get
exports.getAllFood = async (req, res) => {
  try {
    let food = await foodModel.find();

    res.status(200).json({
      success: false,
      message: "Data has retrieved successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in get all food",
      error: error.message,
    });
  }
};

//Get single food - get
exports.getSingleFood = async (req, res) => {
  try {
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

    res.status(200).json({
      success: false,
      message: "Data has retrieved successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in get all food",
      error: error.message,
    });
  }
};

//rating/comment - post
exports.userRating = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    // Check if Id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }
    if (rating < 1)
      return res
        .status(404)
        .json({ success: false, message: "rating required" });

    let food = await foodModel.findById(req.params.id);

    if (!food)
      return res
        .status(404)
        .json({ success: false, message: "food not found" });

    let isAlreadyGiven = await checkUserExist(req.user._id, food);

    if (isAlreadyGiven)
      return res.status(404).json({
        success: false,
        message: "you have already given your feedback",
      });

    await food.reviews.push({
      name: req.user,
      rating: rating,
      comment: comment,
    });
    await food.save();

    res.status(200).json({
      success: false,
      message: "Data has retrieved successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in rating food",
      error: error.message,
    });
  }
};

// //add to cart - get
// exports.addToCart = async (req, res) => {
//   try {
//     const { quantity } = req.body;

//     console.log("body", req.body);
//     const userId = req.user._id; // Assuming you have user information in the request

//     // Check if Id is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(req.params)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid ID",
//       });
//     }

//     let food = await foodModel.findById(req.params.id);

//     if (!food)
//       return res
//         .status(404)
//         .json({ success: false, message: "food not found" });

//     // Check if the food item already exists in the cart
//     let cartItem = await cartModel.findOne({
//       cart: req.params.id,
//       user: userId,
//     });
//     console.log("cartItem", cartItem);

//     res.status(200).json({
//       success: true,
//       message: "Data has retrieved successfully",
//       food: cartItem,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error in rating food",
//       error: error.message,
//     });
//   }
// };
