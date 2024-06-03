// const mongoose = require("mongoose");

// const cartItemSchema = new mongoose.Schema({
//   product: { type: mongoose.Schema.Types.ObjectId, ref: "allProducts", required: true },
//   quantity: { type: Number, required: true, default: 1 },
// });

// const productCartModel = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
//     cartItems: [cartItemSchema],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("AllCartProducts", productCartModel);
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "allProducts",
    required: true,
  },
  quantity: { type: Number, required: true, default: 1 },
});

const productCartModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    cartItems: [cartItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("AllCartProducts", productCartModel);
