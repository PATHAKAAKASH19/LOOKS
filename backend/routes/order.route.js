import express from "express";
import {
  createOrder,
  cancelOrder,
  verifyPayment,
  updateOrder,
  getOrder,
  getAllOrder,
} from "../controllers/order.controller.js";
import authenticate from "../middleware/authentication.middleware.js";

const router = express.Router();

router.get("/seller", getAllOrder);
router.put("/seller", updateOrder);
router.delete("/", cancelOrder);

router.post("/checkout", authenticate,createOrder);
router.post("/verify/:orderId", authenticate,verifyPayment);

router.get("/", authenticate,getOrder);






export default router;
