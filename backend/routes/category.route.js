import express from "express"
import upload from "../utils/multer.util.js"
import { getAllCategory, createCategory, deleteCategory, updateCategory, getSellerSpecificCategory} from "../controllers/categroy.controller.js"
import authenticate from "../middleware/authentication.middleware.js"
import authorization from "../middleware/authorization.middleware.js"


const router = express.Router()



router.get("/", getAllCategory)

router.get("/seller", authenticate,authorization, getSellerSpecificCategory)

router.post("/" , authenticate,authorization,upload.single("categoryImg"),createCategory)

router.put("/:categoryId", authenticate,authorization,upload.single("categoryImg") ,updateCategory)

router.delete("/" ,authenticate,authorization,deleteCategory)


export default router