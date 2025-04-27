import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import  dotenv  from "dotenv"
import productRoute from "./routes/product.route.js"
import categoryRoute from "./routes/category.route.js"
import cartRoute from "./routes/cart.route.js"
import authRoute from "./routes/auth.route.js"
import orderRoute from "./routes/order.route.js"
import userRoute from "./routes/user.route.js"
import {fileURLToPath} from "url";
import path from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
 

dotenv.config()
const app = express()
const mongodbURI = process.env.MONGODB_URI


app.use(cors({
    origin:["http://192.168.0.104:5173", "http://localhost:5173"], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type']
    
}))



// app.use(express.static(buildpath))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())



app.use("/api/cart", cartRoute)
app.use("/api/product" , productRoute)
app.use("/api/category" , categoryRoute)
app.use("/api/auth" , authRoute)
app.use("/api/order" , orderRoute)
app.use("/api/user", userRoute)

// app.get("*", (req, res) => {
//     res.sendFile(path.join(buildpath, "index.html"));
// });


mongoose.connect(mongodbURI)
.then(() => {
    console.log("connected to database")
    app.listen(process.env.PORT || 3000,() => {
        console.log("server started")
    })
})
.catch((error) => {
    console.log("connection failed", error.message)
})