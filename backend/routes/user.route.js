import express from "express"
import {register, login, generateAccessToken, deleteAccount , singOut} from "../controllers/user.controller.js"
const router = express.Router()


router.post("/signup", register )

router.post("/login", login)

router.post("/generate-new-access-token", generateAccessToken)

router.delete("/delete-account", deleteAccount)

router.post("/signout", singOut)

export default router