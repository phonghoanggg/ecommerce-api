import express from "express";
import productController from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", productController.getAllProducts);
// lọc sản phẩm
router.get("/filterProduct", productController.getFilterProduct);
router.get("/:id", productController.getProductdetail);
router.get("/category/:id", productController.getProductsByCategory);
// Kiểm tra số lượng tồn sản phẩm
router.get("/stock/:id", productController.getProductStock);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
// add comment
router.post(
  "/products/:productId/ratings",
  productController.addRatingAndComment
);

export default router;
