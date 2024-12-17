import Product from "../models/products.model.js";
import Category from "../models/category.model.js";
import cloudinary from "../config/clodinary.config.js";
import {
  uploadImagesToCloudinary,
  updateUploadedImagesToCloudinary,
} from "../utils/uploadMultipleImagesToClodinary.util.js";
import fs from "fs";
import mongoose from "mongoose";
import { constants } from "buffer";

//  get all the products
async function getAllProducts(req, res) {
  const { category, price, color, size, materialType } = req.query;
  const categoryDocument = await Category.findOne({ category: category });

  const query = {};

  if (size) query.color = { $in: Array.isArray(size) ? size : [size] };
  if (color) query.color = { $in: Array.isArray(color) ? color : [color] };
  if (price) query.price = { $in: Array.isArray(price) ? price : [price] };
  if (materialType)
    query.materialType = {
      $in: Array.isArray(materialType) ? materialType : [materialType],
    };

  const product = await Product.find(
    {
      category: categoryDocument._id,
      ...query,
    },

    {
      name: 1,
      price: 1,
      sizes: 1,
      category: 1,
      materialType: 1,
      styleType: 1,
      productImgUrls: { $slice: 1 },
    }
  ).populate("category", "category trending subCategory");

  if (product.length !== 0) {
    return res.status(200).json(product);
  } else {
    return res.status(404).json({ err: "product not found" });
  }
}

//  get one product at a time
async function getOneProduct(req, res) {
  const id = req.params.productId;

  const product = await Product.findById(id);

  if (product.length !== 0) {
    return res.status(200).json(product);
  } else {
    return res.status(404).json({ err: "product not found" });
  }
}

// use to create a product
async function addProduct(req, res) {
  const files = req.files;
  console.log(req.body);
  console.log(files);
  console.log(typeof req.body.price);
  console.log(typeof req.body.stock);
  try {
    const {
      name,
      description,
      sizes,
      categoryId,
      materialType,
      styleType,
      color,
    } = req.body;

    const stock = parseFloat(req.body.stock)
    const price = parseFloat(req.body.price)

    console.log(price);
    console.log(stock);
    const productId = new mongoose.Types.ObjectId();

    const sizeArray = Array.isArray(sizes) ? sizes : [sizes];
    const productImgUrls = await uploadImagesToCloudinary(files, productId);

    const newProduct = await Product.create({
      _id: productId,
      name,
      description,
      stock,
      sizes: sizeArray,
      price,
      categoryId, 
      materialType,
      styleType,
      color,
      productImgUrls,
    });

    const populateProduct = await Product.findById(productId).populate(
      "category",
      "category trending subCategory"
    );
    for (const file of files) {
      fs.unlink(file.path, (err) => {
        if (err) console.log(err);
        else {
          console.log("photos deleted successfully from upload folder");
        }
      });
    }
    return res.status(200).json({ message: "product is created successfully" });
  } catch (error) {
    for (const file of files) {
      fs.unlink(file.path, (err) => {
        if (err) console.log(err);
        else {
          console.log("photos deleted successfully from upload folder");
        }
      });
    }

    res.status(400).json({ err: "error in product", details: error });
  }
}

// to update a product
async function updateProduct(req, res) {
  const files = req.files;
  try {
    const productId = req.params.id;
    const { replacingIndex, sizes, ...rest } = req.body;
    const product = Product.findById(productId);

    const sizeArray = Array.isArray(sizes) ? sizes : [sizes];
    const imgUrls = [...product.productImgUrls];

    if (files.length > 0) {
      for (const file of files) {
        const secure_url = imgUrls[replacingIndex];
        const updatedUrl = await updateUploadedImagesToCloudinary(
          file,
          secure_url
        );
        imgUrls[replacingIndex] = updatedUrl;

        fs.unlink(file.path, (err) => {
          if (err) console.log(err);
          else {
            console.log("photos deleted successfully from upload folder");
          }
        });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      ...rest,
      sizes: sizeArray,
      productImgUrls: imgUrls,
    });

    res.status(200).json({
      message: "product is updated successfully",
      details: updateProduct,
    });
  } catch (error) {
    for (const file of files) {
      fs.unlink(file.path, (err) => {
        if (err) console.log(err);
        else {
          console.log("photos deleted successfully from upload folder");
        }
      });
    }
    res.status(500).json({ message: "internal error", details: error });
  }
}

// to delete a product
async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;

    await cloudinary.api.delete_resources_by_prefix(
      `e-commerce-shop/product-page-images/${productId}`
    );
    await cloudinary.api.delete_folder(
      `e-commerce-shop/product-page-images/${productId}`
    );
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "error", details: error });
  }
}

export {
  getOneProduct,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
