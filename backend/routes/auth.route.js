import express from "express";
import {
  register,
  login,
  logOut,
  changePassword,
} from "../controllers/auth.controller.js";
import authenticate from "../middleware/authentication.middleware.js";
const router = express.Router();

router.post("/signup", register);

router.post("/login", login);

router.put("/change-password", authenticate,changePassword);

router.delete("/logout", authenticate,logOut);

export default router;
