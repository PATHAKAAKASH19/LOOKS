import Order from "../models/order.model.js";
import { instance } from "../config/razorpay.config.js";
import crypto from "crypto";
import Cart from "../models/cart.model.js";
import Payment from "../models/payment.model.js";
import mongoose from "mongoose";
import Product from "../models/products.model.js";

async function createOrder(req, res) {
  try {
    const { address } = req.body;
    const {userId} = req

   

   
    if(!address || typeof address !== "object"  || Array.isArray(address)){
      return res.status(400).json({success: false, message:"Invalid address"})
    }


    const cart = await Cart.find({ userId: userId }).populate("products.productId", "price");

    if(!cart || cart.length === 0){
      return res.status(404).json({success: false, message:"Please add product to your cart"})
    }

    const totalPrice = cart[0].products.reduce((accumulator, product) => accumulator+product.productId.price,0)
    
    const orderedItem = await Promise.all(
      cart[0].products.map(async (productObj) =>  {

        try {
          const pdoc = await Product.findById(productObj.productId)
      
          return {
            productId:productObj.productId,
            quantity:productObj.quantity,
            size:productObj.size,
            sellerId:pdoc.sellerId, 
            status: "pending"}
        } catch (error) {
          console.log("error",error)
        }
    }))

    

    const deleteOrder = await Order.deleteMany({paymentStatus: false, userId: userId});
      const order = await Order.create({
        userId: userId,
        totalPrice: Number(totalPrice),
        orderedItem: orderedItem,
        deliveryAddress: address,
      });

      
      const options = {
        amount: Number(totalPrice * 100),
        currency: "INR",
        receipt: order._id.toString(),
      };

      
      const razorpayOrder = await instance.orders.create(options);
   
     
      return res.status(200).json({
        orderId: order._id,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
      });

      
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}



async function verifyPayment(req, res) {
  try {
    const { payment_id,order_id,signature } =  req.body;
    const {orderId}= req.params
 
    const generatedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
                   .update( `${order_id}|${payment_id}`)
                   .digest("hex");
      
    const isAuthentic = generatedSignature === signature;
    
    if (isAuthentic) {
    
      const payment = await Payment.create({
        razorpay_payment_id:payment_id,
        razorpay_order_id:order_id,
        razorpay_signature:signature,
      });
 
    
      const order = await Order.findByIdAndUpdate(orderId, {
        paymentId: payment._id,
        paymentStatus: true,
      }, {new:true});

      const cart = await Cart.findOneAndDelete({userId:order.userId})
      return res.status(200).json({success:true, message:"Payment Successfull", orderId:order._id})
    } else {
       return res.status(400).json({ success: false, message: "retry" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

async function getOrder(req, res) {
  try {
    const { userId } = req;

   
   
    const userOrders = await Order.find({ userId: userId }).populate({
      path: "orderedItem.productId",
      select: "productImgUrls name",
      options: { productImgUrls: { $slice: 1 } }, // Limit to the first image
    });

    if (!userOrders || userOrders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No order found for this user" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User orders present", userOrders });

    
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function getAllOrder(req, res) {
  try {

    const sellerId = req.userId
   
    const orders = await Order.find(
      {"orderedItem.sellerId":sellerId}, 
      { 
        userId: 1,
       _id:1,
        paymentStatus:1,
       
       'orderedItem.$': 1, // Only return matching items
       createdAt: 1, 
      })
      .populate("orderedItem.productId", "name productImgUrls price")
      .populate("userId", "firstName lastName");

      console.log(orders)

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "no order present" });
    }

    return res
      .status(200)
      .json({ success: true, message: "orders are present", orders });
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

async function cancelOrder(req, res) {
  try {
  } catch (error) {}
}

async function updateOrder(req, res) {
  try {
    const { productStatus, orderId} = req.body;
    const sellerId = req.userId


    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid orderId" });
    }

    if (!productStatus) {
      return res
        .status(400)
        .json({ success: false, message: "Order status is required" });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      {
        _id:orderId,
        "orderedItem.sellerId":sellerId,
      },
     {
      $set: {
           "orderedItem.$[ele].status":productStatus,       
      }
     },
      {
       arrayFilters: [{"ele.sellerId":sellerId}], 
       new: true 
      }
    );


    
    

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "error in updating order" });
    }

  
    return res
      .status(200)
      .json({ success: true, message: "Order Status updated" , updatedOrder});
  } catch (error) {
    console.log("error");
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export {
  createOrder,
  cancelOrder,
  updateOrder,
 
  verifyPayment,
  getOrder,
  getAllOrder,
};
