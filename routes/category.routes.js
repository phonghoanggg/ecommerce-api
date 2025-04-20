import express from "express";
import categoryController from "../controllers/category.controller.js";
const router = express.Router();

// router.get("/:id", categoryController.getOneSCategories);
router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;
