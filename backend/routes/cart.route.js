import express from "express"

import {getCartItems, addItemToCart, updateCartItem, deleteCartItem, deleteCart} from "../controllers/cart.controller.js"
const router = express.Router()


router.get("/" , getCartItems)
router.post("/" ,addItemToCart )
router.put("/" ,  updateCartItem)
router.delete("/:productId" , deleteCartItem)
router.delete("/:id" , deleteCart)

export default router
