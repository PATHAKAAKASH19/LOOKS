import User from "../models/users.model.js";

async function getUser(req, res) {
  try {
    const { userId } = req.body;

    const userExist = await User.findById(userId);

    if (!userExist) {
      return res.status(200).json({ userData: userExist });
    }

    return res.status(404).json({ message: "user not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
}

async function updateUser(req, res) {
  try {
    const query = {};
    const {
      firstName,
      lastName,
      phoneNo,
      address,
      wishlist,
      email,
      wishlistAction,
      addressAction,
    } = req.body;
    const { userId } = req.params;

    if (wishlistAction === "save") {
      query.$push = { wishlist: wishlist };
    } else if (wishlistAction === "delete") {
      query.$pull = { wishlist: wishlist };
    }

    if (addressAction === "save") {
      query.$push = { address: address };
    } else if (addressAction === "delete") {
      query.$pull = { address: address };
    }
    const userExist = await User.findByIdAndUpdate(userId, {
      firstName,
      lastName,
      email,
      phoneNo,
      ...query,
    });

    return res.status(200).json({ message: "user info updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
}


export { getUser, updateUser };
