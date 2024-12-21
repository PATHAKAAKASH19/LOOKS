import Cart from "../models/cart.model.js";

async function getCartItems(req, res) {
  try {
    const { userId } = req.body;
    const cart = await Cart.findById(userId);

    if (cart.length > 0) {
      const populateCart = cart
        .populate("user")
        .populate("products.productId", "name price productImgUrls");
      return res.status(200).json({ populateCart });
    } else {
      return res.status(404).json({ message: "please add product" });
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
}

async function addItemToCart(req, res) {
  try {
    const { productId, userId, quantity, size } = req.body;
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        products: [{ productId, quantity, size }],
      });
    } else {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (
        productIndex >= 0 &&
        cart.products[productIndex].quantity !== quantity
      ) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.push({ productId, quantity, size });
      }

      if (productIndex >= 0 && cart.products[productIndex].size !== size) {
        cart.products[productIndex].size = size;
      }
    }

    await cart.save();

    return res.status(200).json({ message: "product is added to cart successfully" });
  } catch (error) {
    return res.status(500).status({ err: error });
  }
}

async function updateCartItem(req, res) {
  try {
    const { quantity, size, userId, productId } = req.body;

    const cart = await Cart.findOne({ user: userId });

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex >= 0 && cart.products[productIndex].size !== size) {
      cart.products[productIndex].size = size;
    }

    if (
      productIndex >= 0 &&
      cart.products[productIndex].quantity !== quantity
    ) {
      cart.products[productIndex].quantity = quantity;
    }

    await cart.save();

    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
}

async function deleteCardItem(req, res) {
  try {
    const { userId } = res.body;
    const productId = res.query.productId;

    const cart = await Cart.findOne({ user: userId });

    const productIndexValue = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    const deleteElement = await cart.updateOne({ _id: "document_id" }, [
      { $set: { [`products.${productIndexValue}`]: null } }, // Set element at index 1 to `null`
      { $pull: { products: null } }, // Remove all `null` elements
    ]);

    return res.status(200).json({ message: "product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
}

async function deleteCart(params) {
  try {
    const { userId } = res.body;

    const deleteCart = await Cart.findOneAndDelete({ userId: userId });

    if (deleteCart) {
      return res.status(200).json({ message: "cart items deleted successfully" });
    } else {
      return res.status(404).json({ message: "cart is empty" });
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
}

export {
  getCartItems,
  addItemToCart,
  updateCartItem,
  deleteCardItem,
  deleteCart,
};
