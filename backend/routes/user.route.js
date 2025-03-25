import express from "express";
import { getUserInfo, updateUserInfo } from "../controllers/user.controller.js";
import authenticate from "../middleware/authentication.middleware.js";
const router = express.Router();

router.get("/", authenticate,getUserInfo);

router.put("/", authenticate,updateUserInfo);

export default router;
