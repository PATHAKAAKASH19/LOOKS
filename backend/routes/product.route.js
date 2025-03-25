import express from "express"
import upload from "../utils/multer.util.js"
import { getProductById, getProduct, addProduct, deleteProduct, updateProduct, getProductsByCategory } from "../controllers/product.controller.js"
const router = express.Router()





router.get("/", getProduct)

router.get("/category/:categoryId" , getProductsByCategory)

router.get("/:productId", getProductById)

router.post("/",upload.array("productImages", 5), addProduct)

router.put("/:productId", upload.array("productImages"),updateProduct)

router.delete("/:productId", deleteProduct)


export default router