import express from "express"
import upload from "../utils/multer.util.js"
import { getAllCategory, createCategory, deleteCategory, updateCategory} from "../controllers/categroy.controller.js"


const router = express.Router()



router.get("/", getAllCategory)

router.post("/" , upload.single("categoryImg"),createCategory)

router.put("/:id", upload.single("categoryImg") ,updateCategory)

router.delete("/" ,  deleteCategory)


export default router