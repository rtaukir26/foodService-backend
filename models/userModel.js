const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, trim: true, required: true, select: false },
    confirmPassword: {
      type: String,
      trim: true,
      required: true,
      select: false,
    },
    mobileNumber: { type: Number, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
