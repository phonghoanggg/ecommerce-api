import express from "express";
import {
  createOrderForUser,
  deleteOrder,
  getAllOders,
  getOrderDetail,
  getRevenueStatistics,
  getSoldProductsStatistics,
  getSoldProductsStatisticsById,
} from "../controllers/oder.controller.js";

import { verifyTokenAndUserAuthorization } from "./../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyTokenAndUserAuthorization, createOrderForUser);
router.get("/revenueStatistics", getRevenueStatistics);
router.get("/soldProductsStatistics", getSoldProductsStatistics);
router.get("/soldProductsStatisticsById", getSoldProductsStatisticsById);
router.get("/:id", verifyTokenAndUserAuthorization, getOrderDetail);
router.delete("/:id", deleteOrder);
router.get("/", getAllOders);

export default router;
