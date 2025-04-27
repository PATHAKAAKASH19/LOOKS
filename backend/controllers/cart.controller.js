import Cart from "../models/cart.model.js";

async function getCartItems(req, res) {
  try {
    const { userId } = req;
   
    const cart = await Cart.findOne({ userId: userId })
    .populate("products.productId", "name price productImgUrls color sizes");
    
    if (cart) {
      return res
        .status(200)
        .json({ success: true, message: "cart is present", cart });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "please add product to cart" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error", error });
  }
}

async function addItemToCart(req, res) {
  try {
    const { productId, quantity, size } = req.body;
 
    const { userId } = req;
   
    let cartPresent = await Cart.findOne({ userId: userId })
    
  
  
    if (!cartPresent) {
      const cart = await Cart.create({
        userId: userId,
        products: [{ productId, quantity, size }],
      }).populate("products.productId", "name price productImgUrls color sizes");

      return res
        .status(200)
        .json({ success: true, message: "Cart created and product added", cart });
    }

    const productIndex = cartPresent.products.findIndex(
      (p) => p.productId._id.toString() === productId.toString()
    );

   
    if (productIndex === -1) {
      
     const cart =  await Cart.findOneAndUpdate(
        { userId: userId },
        {
          $push: {
            products: { productId, size, quantity },
          },
        },{
          new:true
        }
      ).populate("products.productId", "name price productImgUrls color sizes");

      return res
        .status(200)
        .json({ success: true, message: "Product is added to cart", cart });
    } 

    return res.status(400).json({success:false, message:"Product already added to cart"})
  } catch (error) {
    return res
      .status(500)
      .status({ success: false, message: "Internal server error" });
  }
} 


async function updateCartItem(req, res) {
  try {

    const { productId, quantity, size } = req.body;
 
    const { userId } = req;


    let cartPresent = await Cart.findOne({ userId: userId })
    

  
    if (!cartPresent) {
      return res
        .status(400)
        .json({ success: true, message: "first add product to cart"});
    }


    const productIndex = cartPresent.products.findIndex(
      (p) => p._id.toString() === productId.toString()
    );

     if (productIndex !== -1) {
      
     const cart = await Cart.findOneAndUpdate(
        {
          userId: userId,
          "products._id": productId,
         
        },
        {
          $set: {
            "products.$.size": size,
          },
        },
        {
          new: true,
        }
      ).populate("products.productId", "name price productImgUrls color sizes");

    

      return res.status(200).json({ success: true, message: "updated", cart});
     

    }
  } catch (error) {
    return res
      .status(500)
      .status({ success: false, message: "Internal server error" });
  }
}

async function deleteCartItem(req, res) {
  try {
    const { userId } = req;
    const { productId } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { userId: userId },
      {
        $pull: { products: { _id: productId } },
      },
      {
         new:true
      }
    ).populate("products.productId", "name price productImgUrls color sizes");

   
    return res
      .status(200)
      .json({ success: true, message: "product deleted successfully" , cart});
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
}






export { getCartItems, addItemToCart, deleteCartItem ,  updateCartItem };
