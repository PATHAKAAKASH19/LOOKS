import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv"

configDotenv()

function authenticate(req, res, next){
    
    const token = req.header("Authorization")?.split(' ')[1]
    if(!token) return res.status(403).json({message: "please provide access token"})

    try {
        
        

       const decode =  jwt.verify(token,  process.env.JWT_SECRET)

       req.user = decode
       next()
    } catch (error) {
         res.status(400).json({message: "invalid token"})
    }
    
}

export default authenticate