import express from "express"
import upload from "../utils/multer.util.js"
import { getAllCategory, createCategory, deleteCategory, updateCategory} from "../controllers/categroy.controller.js"
import authenticate from "../middleware/authentication.middleware.js"
import authorization from "../middleware/authorization.middleware.js"


const router = express.Router()



router.get("/", getAllCategory)

router.post("/" , upload.single("categoryImg"),authenticate,authorization,createCategory)

router.put("/:id", upload.single("categoryImg") ,authenticate,authorization,updateCategory)

router.delete("/" ,authenticate  ,authorization,deleteCategory)


export default router