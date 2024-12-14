import express from "express"
import upload from "../utils/multer.util.js"
import { getAllCategory, createCategory, deleteCategory, updateCategory} from "../controllers/categroy.controller.js"


const router = express.Router()



router.get("/get", getAllCategory)

router.post("/create" , upload.single("categoryImg"),createCategory)

router.put("/update/:id", upload.single("categoryImg") ,updateCategory)

router.delete("/delete" ,  deleteCategory)


export default router