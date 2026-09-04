import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    variant: {
      color: {
        type: String,
        required: true,
      },
      storage: {
        type: String,
        required: true,
      },
    },

    customer: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
    },

    emi: {
      tenure: {
        type: Number,
        required: true,
      },

      monthlyPayment: {
        type: Number,
        required: true,
      },

      interestRate: {
        type: Number,
        required: true,
      },

      cashback: {
        type: Number,
        default: 0,
      },
    },

    productPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PLACED", "CANCELLED"],
      default: "PLACED",
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
