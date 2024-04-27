import express from "express";
import {
  createOrderForUser,
  deleteOrder,
  filterOrderByStatus,
  getAllOrders,
  getOrderDetail,
  getRevenueStatistics,
  getSoldProductsByMonthAndYear,
  getSoldProductsStatistics,
  getSoldProductsStatisticsById,
  updateStatusorder,
} from "../controllers/oder.controller.js";

const router = express.Router();

router.post("/", createOrderForUser);
router.patch("/updateStatusorder", updateStatusorder);
router.get("/revenueStatistics", getRevenueStatistics);
router.get("/soldProductsStatistics", getSoldProductsStatistics);
router.get("/soldProductsStatisticsById", getSoldProductsStatisticsById);
router.get("/soldProductsByMonthAndYear", getSoldProductsByMonthAndYear);
router.get("/filterOrderByStatus", filterOrderByStatus);
router.get("/:id", getOrderDetail);
router.delete("/:id", deleteOrder);
router.get("/", getAllOrders);

export default router;
