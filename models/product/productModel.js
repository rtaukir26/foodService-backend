const mongoose = require("mongoose");

const productModel = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, trim: true, required: true }, //watches,trees,clothes...
    quantity: { type: Number, default: 1 },

    photo: { data: Buffer, contentType: String },
    // rating: { type: Number, required: true, default: 0 },
    // comment: { type: String },

    reviews: [
      {
        name: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        rating: { type: Number, default: 0, required: true },
        comment: { type: String },
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("allProducts", productModel);
