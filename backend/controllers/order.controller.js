import Order from "../models/order.model.js";
import { instance } from "../config/razorpay.config.js";
import crypto from "crypto";
import Cart from "../models/cart.model.js";
import Payment from "../models/payment.model.js";
import mongoose from "mongoose";

async function createOrder(req, res) {
  try {
    const { amount, address } = req.body;
    const {userId} = req

   

    if(!amount || typeof amount !== "number" || amount <= 0){
      return res.status(400).json({success: false, message:"Invalid amount"})
    }

    if(!address || typeof address !== "object"  || Array.isArray(address)){
      return res.status(400).json({success: false, message:"Invalid address"})
    }


    const cart = await Cart.find({ userId: userId });

    if(!cart || cart.length === 0){
      return res.status(404).json({success: false, message:"No cart present for this user"})
    }


    
    const deleteOrder = await Order.deleteMany({paymentStatus: false,});
      const order = await Order.create({
        userId: userId,
        totalPrice: amount,
        orderedItem: cart[0].products,
        deliveryAddress: address,
      });

      const options = {
        amount: Number(amount * 100),
        currency: "INR",
        receipt: order._id.toString(),
      };
      const razorpayOrder = await instance.orders.create(options);
   
      console.log(razorpayOrder)
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

    return res.status(400).json({ success: false, message: "invalid request" });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function getAllOrder(req, res) {
  try {
    const orders = await Order.find({}, { paymentId: 0 })
      .populate("orderedItem.productId", "name productImgUrls price")
      .populate("userId", "firstName lastName");

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "no order present" });
    }

    return res
      .status(200)
      .json({ success: true, message: "orders are present", orders });
  } catch (error) {
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
    const { orderStatus, orderId } = req.body;

    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid orderId" });
    }

    if (!orderStatus) {
      return res
        .status(400)
        .json({ success: false, message: "Order status is required" });
    }

    const updateOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        orderStatus,
      },
      { new: true }
    );

    if (!updateOrder) {
      return res
        .status(404)
        .json({ success: false, message: "error in updating order" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Order Status updated" });
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
