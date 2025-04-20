import express from "express";
import CartController from "../controllers/cart.controller.js";
const router = express.Router();

router.get("/:id", CartController.get_cart);
router.get("/", CartController.get_carts);
router.post("/", CartController.create_cart);
router.put("/:id", CartController.update_cart);
router.delete("/:id", CartController.delete_cart);

export default router;
