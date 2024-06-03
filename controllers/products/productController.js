const mongoose = require("mongoose");
const Products = require("../../models/product/productModel");
const CartProducts = require("../../models/product/ProductCartModel");
// const { checkUserExist } = require("../utils/isUserExist");

//Create product - post
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category, photo, rating, reviews } =
      req.body;

    let product = await Products.create({
      name,
      price,
      description,
      category,
      //   rating,
      //   reviews,
      user: req.user,
      photo: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    res.status(200).json({
      success: false,
      message: "product has created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in create product",
      error: error.message,
    });
  }
};

//get all products - get
exports.getAllProducts = async (req, res) => {
  try {
    let product = await Products.find();

    res.status(200).json({
      success: false,
      message: "Data has retrieved successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in create get all products",
      error: error.message,
    });
  }
};

//Add product to cart - get
exports.addToCartProduct = async (req, res) => {
  try {
    const { id, quantity } = req.query;
    const user = req.user;

    if (!id || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }

    const productId = new mongoose.Types.ObjectId(id); // Properly create ObjectId
    const productQuantity = parseInt(quantity, 10);

    let cart = await CartProducts.findOne({ user: user._id }).populate(
      "cartItems.product"
    );

    if (!cart) {
      cart = new CartProducts({ user: user._id, cartItems: [] });
    }

    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId.toString()
    );

    if (productIndex > -1) {
      cart.cartItems[productIndex].quantity += productQuantity;
    } else {
      const product = await Products.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      cart.cartItems.push({
        product: productId,
        quantity: productQuantity,
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product has been added to cart successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in adding product to cart",
      error: error.message,
    });
  }
};

//get all cart products
exports.getAllCartProduct = async (req, res) => {
  try {
    let cart = await CartProducts.findOne({ user: req.user._id }).populate(
      "cartItems.product"
    );

    for (let item of cart.cartItems) {
      item.product.quantity = item.quantity;
    }

    await cart.save();

    res.status(200).json({
      success: false,
      message: "Data has retrieved successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in get all cart products",
      error: error.message,
    });
  }
};
