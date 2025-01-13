import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import { configDotenv } from "dotenv"
import productRoute from "./routes/product.route.js"
import categoryRoute from "./routes/category.route.js"
import cartRoute from "./routes/cart.route.js"
import userAuthRoute from "./routes/user.route.js"
import orderRoute from "./routes/order.route.js"

const app = express()

configDotenv()


const mongodbURI = process.env.MONGODB_URI

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
    if (req.body && typeof req.body === "object") {
      for (const key in req.body) {
        if (typeof req.body[key] === "string") {
          req.body[key] = req.body[key].toLowerCase();
        }
      }
    }
    next();
  });
app.use("/api/cart", cartRoute)
app.use("/api/product" , productRoute)
app.use("/api/category" , categoryRoute)
app.use("/api/auth" , userAuthRoute)
app.use("/api/order" , orderRoute)

mongoose.connect(mongodbURI)
.then(() => {
    console.log("connected to database")
    app.listen(3000, () => {
        console.log("server started")
    })
})
.catch(() => {
    console.log("connection failed")
})