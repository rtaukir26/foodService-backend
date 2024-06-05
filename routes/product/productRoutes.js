const express = require("express");
const multer = require("multer");
const {
  createProduct,
  getAllProducts,
  addToCartProduct,
  getAllCartProduct,
} = require("../../controllers/products/productController");
const { isAuthenticated } = require("../../middleware/auth");
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

//Create product - post - Admin/validation pending, is admin or not
router.post("/new", isAuthenticated, upload.single("photo"), createProduct);
//Get all products
router.get("/all", isAuthenticated, getAllProducts);
//Add to cart
router.get("/add-to-cart", isAuthenticated, addToCartProduct);
//Get all cart products
router.get("/cart", isAuthenticated, getAllCartProduct);

module.exports = router;
