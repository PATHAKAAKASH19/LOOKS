
import mongoose from "mongoose";

const cartSchema = mongoose.Schema({

    products: [
         {
         productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
       
        quantity: {
           type: Number,
           required: true,
           default: 1
        }, 

        size: {
            type: String,
            required: true
        }
        
    }],

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    }
})


const Cart = mongoose.model("Cart", cartSchema)

export default Cart