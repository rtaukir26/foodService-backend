const foodModel = require("../models/foodModel");

//Get single food - get
exports.getSingleFood = async (req, res) => {
  try {
    console.log(object);
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
