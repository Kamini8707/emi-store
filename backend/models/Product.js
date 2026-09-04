import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },

  storage: {
    type: String,
    required: true,
  },

  images: {
    type: [String],
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },
});

const emiPlanSchema = new mongoose.Schema({
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
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    mrp: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    images: {
      type: [String],
      required: true,
    },

    variants: {
      type: [variantSchema],
      required: true,
    },

    emiPlans: {
      type: [emiPlanSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
