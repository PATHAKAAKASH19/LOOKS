import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import User from "../models/users.model.js";
import mongoose from "mongoose";

configDotenv();

async function authenticate(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token)
    return res.status(403).json({ message: "please login first" });
 
  try { 
     const decode = jwt.verify(token, process.env.JWT_SECRET);
    
      if (!decode.userId || !mongoose.Types.ObjectId.isValid(decode.userId)) {
           return res
             .status(403)
             .json({ success: false, message: "please login" });
         }

       
      const user = await User.findById(decode.userId)
     
      if (!user) return res.status(404).json({ message: "Please signUp first" });

      req.userId = decode.userId
      next();
  } catch (error) {
    res.status(401).json({ message: "invalid token" });
  }
}

export default authenticate;
