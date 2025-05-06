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



 

dotenv.config()
const app = express()
const mongodbURI = process.env.MONGODB_URI






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