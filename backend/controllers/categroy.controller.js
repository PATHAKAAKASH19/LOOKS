import Category from "../models/category.model.js";
import cloudinary from "../config/clodinary.config.js";
import extractPublicId from "../utils/getPublic_Id.util.js";
import fs from "fs";

// use to get all the category
async function getAllCategory(req, res) {
  try {
    const category = await Category.find();

    if (category.length !== 0) {
      return res.status(200).json(category);
    }

    return res.status(204).json({ err: "no category found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while geting orders",
      error,
    });
  }
}

// use to create an category
async function createCategory(req, res) {
  try {
    const imgDataFromCloudinary = await cloudinary.uploader.upload(
      req.file.path,
      { folder: "e-commerce-shop/home-page-images" }
    );

    const category = await Category.create({
      ...req.body,
      imgUrl: imgDataFromCloudinary.secure_url,
    });

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log("photos of category deleted from server successfully");
      }
    });
    return res.status(201).json({ message: "category created successfully" });
  } catch (error) {
    console.log(error);
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log("photos of category deleted");
      }
    });
    return res
      .status(500)
      .json({ success: false, message: "error in creating category", error });
  }
}

// use to update an category
async function updateCategory(req, res) {
  try {
    const secure_url = req.body.imgUrl;
    if (secure_url) {
      const publicId = extractPublicId(secure_url);

      const imgDataFromCloudinary = await cloudinary.uploader.upload(req.file.path, {
        public_id: publicId,
        overwrite: true,
      });

      const category = await Category.findOneAndUpdate(
        { _id: req.params.id },
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
          console.log("\ncategory photo updated successfully");
        }
      });
    } else {
      const category = await Category.findOneAndUpdate(
        { _id: req.params.id },
        {
          ...req.body,
        }
      );
    }

    return res.status(200).json({ message: "category updated sucessfully" });
  } catch (error) {
    console.log(error);
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log("\n category photo did not updated");
      }
    });
    return res
      .status(500)
      .json({ success: false, message: "category update failed", error });
  }
}

// use to delete an category
async function deleteCategory(req, res) {
  const secure_url = req.body.imgUrl;

  if (!secure_url) {
    return res.status(400).json({ err: "please provide img url" });
  }
  try {
    const publicId = extractPublicId(secure_url);
    const imgDataFromCloudinary = await cloudinary.uploader.destroy(publicId);
    const deleteCategory = await Category.findOneAndDelete(req.body);
    return res.status(200).json({ message: "category deleted successfully " });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "error in category deletion", error });
  }
}

export { getAllCategory, createCategory, updateCategory, deleteCategory };
