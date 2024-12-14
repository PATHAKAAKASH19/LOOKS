import cloudinary from "../config/clodinary.config.js";
import extractPublicId from "./getPublic_Id.util.js";

async function uploadImagesToCloudinary(files, productId){

  const imgUrlArray = []

  for (const file of files) {
     const imageDataFromCloudinary = await cloudinary.uploader.upload(file.path , {
        folder:`e-commerce-shop/product-page-images/${productId}`
    })

    imgUrlArray.push(imageDataFromCloudinary.secure_url)
  }

   return imgUrlArray
}




async function updateUploadedImagesToCloudinary(files, secure_url){
   
   try {
      for (const file of files) {
         const publicId = extractPublicId(secure_url)
         const imageDataFromCloudinary = await cloudinary.uploader.upload(file.path, {
           public_id: publicId,
           overwrite: true
         })

         return imageDataFromCloudinary.secure_url
      }
   } catch (error) {
      
   }
}



export  {uploadImagesToCloudinary, updateUploadedImagesToCloudinary}

