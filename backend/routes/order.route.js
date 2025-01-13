import express from "express";
import {
  getOrder,
  createOrder,
  cancelOrder,
  updateOrder,
} from "../controllers/order.controller.js";
const router = express.Router();

router.get("/", getOrder);
router.post("/", createOrder);
router.put("/", updateOrder);
router.delete("/", cancelOrder);

export default router;
