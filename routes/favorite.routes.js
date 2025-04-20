import express from "express";
import {
  addFavoriteProduct,
  getFavoriteProductsByUser,
  removeFavoriteProduct,
} from "../controllers/favorite.controller.js";

const router = express.Router();

// Định nghĩa route để thêm sản phẩm vào danh sách yêu thích của người dùng
router.post("/", addFavoriteProduct);
router.delete("/:userId/:productId", removeFavoriteProduct);

// Định nghĩa route để lấy danh sách sản phẩm yêu thích của người dùng
router.get("/:userId", getFavoriteProductsByUser);

export default router;
