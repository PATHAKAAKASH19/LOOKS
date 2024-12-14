import express from "express"
import {getOrder, createOrder, cancelOrder, updateOrder} from "../controllers/order.controller.js"
const router = express.Router()

router.get("/get" , getOrder)
router.post("/create" , createOrder)
router.put("/update" , cancelOrder)
router.delete("/delete" , updateOrder)

export default router