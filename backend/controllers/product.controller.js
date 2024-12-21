import Product from "../models/products.model.js";
import Category from "../models/category.model.js";
import cloudinary from "../config/clodinary.config.js";
import {
  uploadImagesToCloudinary,
  updateUploadedImagesToCloudinary,
} from "../utils/uploadMultipleImagesToClodinary.util.js";
import fs from "fs";
import mongoose from "mongoose";

// get all the products created by seller
async function getAllProducts(req, res) {
  try {
    const allProducts = await Product.find();

    if (allProducts) {
      return res.status(200).json(allProducts);
    }

    return res
      .status(204)
      .json({ success: false, message: "no product present" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "error in getting product", error });
  }
}

//  get all the products by category
async function getProductsByCategory(req, res) {
  try {
    let query = {};

    const { category, price, color, size, materialType } = req.query;
    const categoryDocument = await Category.findOne({ category: category });

    if (!categoryDocument) {
      return res.status(404).json({ message: "Category not exist" });
    }
    if (size) query.size = { $in: Array.isArray(size) ? size : [size] };
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
      return res
        .status(204)
        .json({ success: false, message: "this category has no product" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in getting product by category",
      error,
    });
  }
}

//  get one product at a time
async function getOneProduct(req, res) {
  try {
    const id = req.params.productId;

    const product = await Product.findById(id);

    if (product.length !== 0) {
      return res.status(200).json(product);
    } else {
      return res
        .status(204)
        .json({ success: false, message: "product not present" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "error in getting product", error });
  }
}

// use to create a product
async function addProduct(req, res) {
  const files = req.files;

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
    console.log(categoryId)
    const stock = parseFloat(req.body.stock);
    const price = parseFloat(req.body.price);

    const productId = new mongoose.Types.ObjectId();

    const productImgUrls = await uploadImagesToCloudinary(files, productId);

    const newProduct = await Product.create({
      _id: productId,
      name,
      description,
      stock,
      sizes,
      price,
      categoryId,
      materialType,
      styleType,
      color,
      productImgUrls,
    });

    const populateProduct = await Product.findById(productId).populate(
      "categoryId",
      "category trending subCategory"
    );

    for (const file of files) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log("photos deleted successfully");
        }
      });
    }

    return res.status(201).json({ message: "product is created successfully" });
  } catch (error) {
    console.log(error);
    for (const file of files) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log("photos deleted successfully from upload folder");
        }
      });
    }

    return res
      .status(500)
      .json({ success: false, message: "error in product", error });
  }
}

// to update a product
async function updateProduct(req, res) {
  const files = req.files;
  try {
    const productId = req.params.id;
    const { replacingIndex, sizes, ...rest } = req.body;
    const product = await Product.findById(productId);

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
          if (err) {
            console.log(err);
            return;
          } else {
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

    return res.status(200).json({ message: "product is updated successfully" });
  } catch (error) {
    console.log(error);
    for (const file of files) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log("photos deleted successfully from upload folder");
        }
      });
    }
    return res
      .status(500)
      .json({ success: false, message: "error in updating product", error });
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
    return res.status(200).json({ message: "product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "error in product deletion", error });
  }
}

export {
  getAllProducts,
  getOneProduct,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
};
