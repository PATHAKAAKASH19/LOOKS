import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

async function changePassword(req, res) {
  try {
    const { newPassword } = req.body;
    const { userId } = req;
  
    const userExist = await User.findById(userId);
    
    if (!newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide new password" });
    }

    if (!userExist) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    userExist.password = hashedPassword;

    await userExist.save();

    

    return res.status(200).json({ success: true,message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occurred while changing the password" });
  }
}

async function register(req, res) {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "Email and password are required" });
    }

   

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res
        .status(403)
        .json({ message: "user already exist, Please log in" });
    }

    // hashing the password by bcrupt
    const hashPassword = await bcrypt.hash(password, 10);

    // storing the hashed password in database
    const createUser = await User.create({
      email: email,
      password: hashPassword,
      role:role,
    });

    return res.status(200).json({ message: "user register successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
}

async function login(req, res) {
  try {
    const { email, password, role } = req.body;
   
   
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const userExist = await User.findOne({ email: email });

  
    if (!userExist) {
      return res.status(401).json({ message: "please signup first" });
    }

    
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExist.password
    );

 

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "invalid password" });
    }

     const accessToken = jwt.sign(
        { userId: userExist._id, role: userExist.role },
        process.env.JWT_SECRET,
        { expiresIn: "10d" }
      );

      return res
        .status(200)
        .json({ userId: userExist._id, accessToken: accessToken });

    } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", err: error });
  }
}



async function logOut(req, res) {
  try {
 
    const {userId} = req
    console.log(userId)
    const removeUserInfo = await User.findByIdAndDelete(userId);
    return res.status(200).json({success:true, message: "user logout successfully" });
  } catch (error) {
    return res.status(500).json({success:false, message: "internal server error" });
  }
}

export {
  register,
  login,
  logOut,
  changePassword,
};
