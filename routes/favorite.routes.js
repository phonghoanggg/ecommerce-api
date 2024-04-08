import express from "express";
import {
  addFavoriteProduct,
  getFavoriteProductsByUser,
} from "../controllers/favoriteProductController.js";

const router = express.Router();

// Định nghĩa route để thêm sản phẩm vào danh sách yêu thích của người dùng
router.post("/favorite-products", addFavoriteProduct);

// Định nghĩa route để lấy danh sách sản phẩm yêu thích của người dùng
router.get("/favorite-products/:userId", getFavoriteProductsByUser);

export default router;
