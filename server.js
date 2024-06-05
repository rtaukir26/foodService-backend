const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const foodCartRoutes = require("./routes/foodCartRoutes");
const productRoutes = require("./routes/product/productRoutes");

dotenv.config();

//Database connection
connectDB();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/food", foodRoutes);
app.use("/api/v1/cart", foodCartRoutes);
app.use("/api/v1/product", productRoutes);

// Define your routes here
app.get("/", (req, res) => {
  res.status(200).json({ success: true, serverStatus: "live" });
});

app.listen(process.env.PORT || 4006, () => {
  console.log(
    `server is running on ${process.env.BASE_URL}${process.env.PORT}`
  );
});
