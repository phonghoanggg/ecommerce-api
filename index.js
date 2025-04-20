import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.routes.js";
import cartRoute from "./routes/cart.routes.js";
import categoryRoute from "./routes/category.routes.js";
import favoriteRoute from "./routes/favorite.routes.js";
import oderRoute from "./routes/oder.routes.js";
import productRoute from "./routes/product.routes.js";
import userRoute from "./routes/user.routes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect database");
  } catch (error) {
    console.log("Errors", error);
  }
};

mongoose.set("strictQuery", false);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// routes API
app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/order", oderRoute);
app.use("/cart", cartRoute);
app.use("/favorite", favoriteRoute);

app.listen(PORT, () => {
  connectDb();
  console.log(`Sever running port ${PORT}`);
});
