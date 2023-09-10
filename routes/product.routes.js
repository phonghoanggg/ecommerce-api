import express from "express";
import productController from "../controllers/product.controller.js";
import { verifyTokenAndAdminAuthorization } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductdetail);
router.post(
  "/",
  verifyTokenAndAdminAuthorization,
  productController.createProduct
);
router.put(
  "/:id",
  verifyTokenAndAdminAuthorization,
  productController.updateProduct
);
router.delete(
  "/:id",
  verifyTokenAndAdminAuthorization,
  productController.deleteProduct
);
router.get("/category/:id", productController.getProductsByCategory);

export default router;
