import express from "express";
import userController from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.get("/:id", userController.getUserdetail);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
