import Order from "../models/Order.js";
import Product from "../models/Product.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { productId, color, storage, tenure, customer } = req.body;

    // Required fields
    if (!productId || !color || !storage || !tenure || !customer) {
      return res.status(400).json({
        success: false,
        message: "Required order information is missing",
      });
    }

    // Find product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find exact variant
    const variant = product.variants.find(
      (item) => item.color === color && item.storage === storage,
    );

    if (!variant) {
      return res.status(400).json({
        success: false,
        message: "Product variant not found",
      });
    }

    // Find EMI plan
    const emiPlan = product.emiPlans.find(
      (plan) => plan.tenure === Number(tenure),
    );

    if (!emiPlan) {
      return res.status(400).json({
        success: false,
        message: "EMI plan not found",
      });
    }

    // Stock
    if (variant.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: "Selected product variant is out of stock",
      });
    }

    // Order ID
    const orderId = "EMI" + Math.floor(100000 + Math.random() * 900000);

    // Create order
    const order = await Order.create({
      orderId,

      product: product._id,

      productName: product.name,

      variant: {
        color: variant.color,
        storage: variant.storage,
      },

      customer,

      emi: {
        tenure: emiPlan.tenure,
        monthlyPayment: emiPlan.monthlyPayment,
        interestRate: emiPlan.interestRate,
        cashback: emiPlan.cashback,
      },

      productPrice: product.price,

      status: "PLACED",
    });

    // Reduce stock
    variant.stock -= 1;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
};

// GET ALL ORDERS
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};
