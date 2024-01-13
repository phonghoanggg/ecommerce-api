import express from "express";
import {
  createOrderForUser,
  deleteOrder,
  filterOrderByStatus,
  getAllOders,
  getOrderDetail,
  getRevenueStatistics,
  getSoldProductsStatistics,
  getSoldProductsStatisticsById,
  updateStatusorder,
} from "../controllers/oder.controller.js";

import { verifyTokenAndUserAuthorization } from "./../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyTokenAndUserAuthorization, createOrderForUser);
router.patch("/updateStatusorder", updateStatusorder);
router.get("/revenueStatistics", getRevenueStatistics);
router.get("/soldProductsStatistics", getSoldProductsStatistics);
router.get("/soldProductsStatisticsById", getSoldProductsStatisticsById);
router.get("/filterOrderByStatus", filterOrderByStatus);
router.get("/:id", getOrderDetail);
router.delete("/:id", deleteOrder);
router.get("/", getAllOders);

export default router;
