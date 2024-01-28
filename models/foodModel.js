const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, trim: true, required: true }, //breakfast/lunch/dinnner...
    quantity: { type: Number, default: 1 },
    servingSize: {
      type: String,
      enum: ["half plate", "full plate"], // Enumerated values for serving size
      default: "full plate", // Default serving size
    },
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

module.exports = mongoose.model("allFood", foodSchema);
