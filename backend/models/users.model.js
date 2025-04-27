import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
     
    },

    lastName: {
      type: String,
     
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },

    address: [
      {
        addressLine: {
          type: String,
          required: true,
          default: "",
        },

        locality: {
          type: String,
          required: true,
          default: "",
        },

        city: {
          type: String,
          required: true,
          default: "",
        },

        state: {
          type: String,
          required: true,
          default: "",
        },

        country: {
          type: String,
          required: true,
          default: "",
        },

        zipCode: {
          type: String,
          required: true,
          default: "",
        },
      },
    ],

    phoneNo: {
      type: String,
      match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"],
      sparse: true,
    },

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
