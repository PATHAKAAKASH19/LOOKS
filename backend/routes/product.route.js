import express from "express"
import upload from "../utils/multer.util.js"
import { getOneProduct, getAllProducts, addProduct, deleteProduct, updateProduct } from "../controllers/product.controller.js"
const router = express.Router()





router.get("/get", getAllProducts)

router.get("/search/:productId", getOneProduct)

router.post("/create",upload.array("productImages", 5), addProduct)

router.put("/update/:id", upload.any(),updateProduct)

router.delete("/delete/:id", deleteProduct)


export default router