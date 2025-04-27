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
import authorization from "../middleware/authorization.middleware.js"

const router = express.Router();


router.get("/seller", authenticate,authorization,getAllOrder);
router.put("/orderStatus", authenticate,authorization,updateOrder);

router.delete("/", authenticate,cancelOrder);
router.post("/checkout", authenticate,createOrder);
router.post("/verify/:orderId", authenticate,verifyPayment);
router.get("/", authenticate,getOrder);

export default router;
