import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    customerAddress: [
      {
        name: {
          type: String,
          required: true,
        },
        addressLine: {
          type: String,
          required: true,
        },
        locality: {
          type: String,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
      },
    ],

    paymentInfo: {
      method: {
        type: String, // e.g., 'stripe', 'paypal', 'razorpay'
        required: true,
      },
      paymentId: {
        type: String, // transaction ID from the payment gateway
        required: true,
      },
      status: {
        type: String, // e.g., 'Pending', 'Paid', 'Failed'
        required: true,
      },
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
