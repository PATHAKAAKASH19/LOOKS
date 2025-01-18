import express from "express"
import {register, login, generateAccessToken, deleteAccount , logOut, changePassword} from "../controllers/auth.controller.js"
const router = express.Router()


router.post("/signup", register )

router.post("/login", login)

router.post("/generate-new-access-token", generateAccessToken)

router.delete("/delete-account", deleteAccount)

router.post("/logout", logOut)

router.put("/password", changePassword)

export default router