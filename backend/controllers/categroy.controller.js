import Category from "../models/category.model.js";
import cloudinary from "../config/clodinary.config.js";
import extractPublicId from "../utils/getPublic_Id.util.js";
import fs from "fs";

// use to get all the category
async function getAllCategory(req, res) {
  try {
    const { category, trending, subCategory } = req.query;
   
    const query = {};
    const subCategoryValue = [
      "topwear",
      "bottomwear",
      "accessories",
      "footwear",
      "watches",
    ];

    if (category !== undefined) {
      query.category = category;
    }

    if (trending !== undefined) {
      query.trending = trending;
    }

  

    if (subCategory !== undefined && subCategoryValue.includes(subCategory)) {
      query.subCategory = subCategory;
    }

    const categoryValue = await Category.find(query);
 
    if (categoryValue.length !== 0) {
      return res
        .status(200)
        .json({ success: true, message: "Categroy is present", categoryValue });
    }

    return res
      .status(404)
      .json({ success: false, message: "no category found", categoryValue });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// use to create an category
async function createCategory(req, res) {
  try {

    const sellerId = req.userId

    const isCategoryAlreadyPresent = await Category.findOne({category:req.body.category})

    if(isCategoryAlreadyPresent){
      return res.status(400).json({success:false, message:"This category is already present"})
    }
    
    const imgDataFromCloudinary = await cloudinary.uploader.upload(
      req.file.path,
      { folder: "e-commerce-shop/home-page-images" }
    );

    const category = await Category.create({
      ...req.body,
      sellerId:sellerId,
      imgUrl: imgDataFromCloudinary.secure_url,
    });

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log("category photo deleted successfully");
      }
    });
    return res
      .status(201)
      .json({ success: true, message: "category created successfully" });
  } catch (error) {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: err });
      } else {
        console.log("category photo deleted successfully");
      }
    });
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
}

// use to update an category
async function updateCategory(req, res) {
  try {
    const secure_url = req.body.imgUrl;
    const {categoryId} = req.params
    const sellerId = req.userId
    if (secure_url) {


      
     
      const publicId = extractPublicId(secure_url);

      const imgDataFromCloudinary = await cloudinary.uploader.upload(
        req.file.path,
        {
          public_id: publicId,
          overwrite: true,
        }
      );

      const category = await Category.findOneAndUpdate(
        { _id:categoryId, sellerId:sellerId },
        {
          ...req.body,
          imgUrl: imgDataFromCloudinary.secure_url,
        }
      );

      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log("photo deleted successfully");
        }
      });
    } else {
      const category = await Category.findOneAndUpdate(
        { _id: categoryId, sellerId:sellerId },
        {
          ...req.body,
        }
      );
    }

    return res
      .status(200)
      .json({ success: true, message: "category updated sucessfully" });
  } catch (error) {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log("photo deleted successfully");
      }
    });
    return res.status(500).json({ success: false, message: error.message });
  }
}

// use to delete an category
async function deleteCategory(req, res) {

  const sellerId = req.userId
  const secure_url = req.body.imgUrl;

  if (!secure_url) {
    return res
      .status(400)
      .json({ success: false, message: "please provide img url" });
  }
  try {
    const publicId = extractPublicId(secure_url);
    const imgDataFromCloudinary = await cloudinary.uploader.destroy(publicId);
    const deleteCategory = await Category.findOneAndDelete({...req.body, sellerId});
    return res
      .status(200)
      .json({ success: true, message: "category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}


async function getSellerSpecificCategory(req, res){
  try {
    const sellerId = req.userId
   
    const category = await Category.find({sellerId:sellerId})

    if(!category || category.length === 0){
      return res.status(404).json({success:false, message:"no category present"})
    }

    return res.status(200).json({success:true, message:"category present", category})
  } catch (error) {
    console.log("error ", error)
    return res.status(500).json({success:false, message:"Internal server error"})
  }
}

export { getAllCategory, createCategory, updateCategory, deleteCategory, getSellerSpecificCategory };
