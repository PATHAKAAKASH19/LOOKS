import Category from "../models/category.model.js";
import cloudinary from "../config/clodinary.config.js";
import extractPublicId from "../utils/getPublic_Id.util.js";
import fs from "fs";

// use to get all the category
async function getAllCategory(req, res) {
  const category = await Category.find();

  if (category.length !== 0) {
    return res.status(200).json(category);
  }

  return res.status(404).json({ err: "no category found" });
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
      if (err) console.log(err);
      else {
        console.log("\nDeleted file");
      }
    });
    res.status(200).json({ message: "category created successfully" });
  } catch (error) {
    fs.unlink(req.file.path, (err) => {
      if (err) console.log(err);
      else {
        console.log("\nDeleted file: example_file.txt");
      }
    });
    return res
      .status(400)
      .json({ message: "category is not created", details: error });
  }
}

// use to update an category
async function updateCategory(req, res) {
  const secure_url = req.body.imgUrl;

  if (!secure_url) {
    return res.status(400).json({ err: "please provide img url" });
  }

  try {
    const publicId = extractPublicId(secure_url);

    const imgDataFromCloudinary = await cloudinary.uploader.upload(
      req.file.path,
      { public_id: publicId, overwrite: true }
    );

    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
        imgUrl: imgDataFromCloudinary.secure_url,
      }
    );

    fs.unlink(req.file.path, (err) => {
      if (err) console.log(err);
      else {
        console.log("\nDeleted file");
      }
    });

    res.status(200).json({ message: "sucessfully updated" });
  } catch (error) {
    fs.unlink(req.file.path, (err) => {
      if (err) console.log(err);
      else {
        console.log("\nDeleted file: example_file.txt");
      }
    });
    res.status(500).json({ err: "category update failed", details: error });
  }
}

// use to delete an category
async function deleteCategory(req, res) {
  const secure_url = req.body.imgUrl;

  if (!secure_url) {
    res.status(400).json({ err: "please provide img url" });
  }
  try {
    const publicId = extractPublicId(secure_url);
    const imgDataFromCloudinary = await cloudinary.uploader.destroy(publicId);
    const deleteCategory = await Category.findOneAndDelete(req.body);
    res.status(200).json({ message: "category deleted successfully " });
  } catch (error) {
    res.status(500).json({ err: "not deleted", details: error });
  }
}

export { getAllCategory, createCategory, updateCategory, deleteCategory };
