import express from "express";
import authenticate from "../middleware/authentication.middleware.js";
import {
  getCartItems,
  addItemToCart,
  deleteCartItem,
  updateCartItem
} from "../controllers/cart.controller.js";
const router = express.Router();

router.get("/",authenticate, getCartItems);
router.post("/", authenticate,addItemToCart);
router.put("/",authenticate, updateCartItem )
router.delete("/",authenticate,deleteCartItem);

export default router;
