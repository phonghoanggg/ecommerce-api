import express from "express";
import productController from "../controllers/product.controller.js";
import { verifyTokenAndAdminAuthorization } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductdetail);
router.get("/category/:id", productController.getProductsByCategory);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
