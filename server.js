const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const foodCartRoutes = require("./routes/foodCartRoutes");

dotenv.config();

//Database connection
connectDB();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1/food", foodRoutes);
app.use("/api/v1/cart", foodCartRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
