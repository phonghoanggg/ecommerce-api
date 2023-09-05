import express from "express";
import productController from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductdetail);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/category/:id", productController.getProductsByCategory);

export default router;
