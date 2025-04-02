import User from "../models/users.model.js";

async function getUserInfo(req, res) {
  try {
    const { userId } = req;

    const userData = await User.findById(userId, {
      password: 0,
    }).populate("wishlist", "name price productImgUrls");

    if (userData) {
      return res.status(200).json({ success: true, userData });
    }

    return res.status(404).json({ success: false, message: "user not found" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
}

async function updateUserInfo(req, res) {
  try {
    const query = {};
    const {
      firstName,
      lastName,
      phoneNo,
      address,
      wishlistId,
      email,
      wishlistAction,
      addressAction,
      prevAddressId,
    } = req.body;
    const { userId } = req;

   

    if (!prevAddressId) {
      if (wishlistAction === "save") {
        query.$addToSet = { wishlist: wishlistId };
      } else if (wishlistAction === "delete") {
        query.$pull = { wishlist: wishlistId };
      }

      if (addressAction === "save") {
        const user = await User.findOne({
          _id: userId,
          address: { $elemMatch: address },
        });

        if (!user) {
          query.$push = { address: address }; // Add address only if it doesn't exist
        }


      } else if (addressAction === "delete") {
        query.$pull = { address: address };
      }

      const userData = await User.findOneAndUpdate(
        {
          _id: userId,
        },
        {
          firstName,
          lastName,
          email,
          phoneNo,
          ...query,
        },
        {
          new:true,
          projection:{password:0}
        }
      ).populate("wishlist", "name price productImgUrls");

      

      return res.status(200).json({
        success: true,
        message: "user info updated successfully",
        userData,
      });
    } else {
      const userData = await User.findOneAndUpdate(
        {
          _id: userId,
          "address._id": prevAddressId,
        },
        {
          "address.$": address,
        },
        {
          new:true,
          projection:{password:0}
        }
      ).populate("wishlist", "name price productImgUrls");

      console.log(userData)
      return res.status(200).json({
        success: true,
        message: "address updated successfully",
        userData,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
}

export { getUserInfo, updateUserInfo };
