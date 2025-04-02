import express from "express"
import upload from "../utils/multer.util.js"
import { getProductById, getProduct, addProduct, deleteProduct, updateProduct, getProductsByCategory } from "../controllers/product.controller.js"
import authenticate from "../middleware/authentication.middleware.js"
import authorization from "../middleware/authorization.middleware.js"
const router = express.Router()





router.get("/", getProduct)

router.get("/category/:categoryId" , getProductsByCategory)

router.get("/:productId", getProductById)

router.post("/",authenticate,authorization,upload.array("productImages", 5), addProduct)

router.put("/:productId", authenticate,authorization,upload.array("productImages"),updateProduct)

router.delete("/:productId", authenticate,authorization,deleteProduct)


export default router