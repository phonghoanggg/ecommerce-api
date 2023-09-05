import express from "express";
import userController from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", userController.getAllusers);
router.get("/:id", userController.getuserdetail);
router.post("/", userController.createuser);
router.put("/:id", userController.updateuser);
router.delete("/:id", userController.deleteuser);

export default router;
