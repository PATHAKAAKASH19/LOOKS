import express from "express"

import {getCartItems, addItemToCart, updateCartItem, deleteCardItem, deleteCart} from "../controllers/cart.controller.js"
const router = express.Router()


router.get("/get" , getCartItems)
router.post("/create" ,addItemToCart )
router.put("/update" ,  updateCartItem)
router.delete("/delete/:productId" , deleteCardItem)
router.delete("/delete" , deleteCart)

export default router
