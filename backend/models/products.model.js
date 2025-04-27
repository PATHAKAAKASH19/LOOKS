import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {

    sellerId:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
    },
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"],
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    materialType: {
      type: String,
      required: true,
    },

    styleType: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    productImgUrls: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
