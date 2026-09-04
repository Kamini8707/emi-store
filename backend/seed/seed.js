import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  // ==========================================================
  // iPHONE 17 PRO
  // ==========================================================

  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    brand: "Apple",
    category: "Smartphones",

    description:
      "iPhone 17 Pro with a powerful processor, advanced camera system and premium titanium design.",

    mrp: 134900,
    price: 127400,

    // Default images
    images: [
      "/products/iphone-17-pro/silver/front.jpg",
      "/products/iphone-17-pro/silver/back.jpg",
      "/products/iphone-17-pro/silver/side.jpg",
      "/products/iphone-17-pro/silver/camera.jpg",
    ],

    // ========================================================
    // COLOR VARIANTS
    // ========================================================

    variants: [
      {
        color: "Silver",
        storage: "256GB",

        images: [
          "/products/iphone-17-pro/silver/front.jpg",
          "/products/iphone-17-pro/silver/back.jpg",
          "/products/iphone-17-pro/silver/side.jpg",
          "/products/iphone-17-pro/silver/camera.jpg",
        ],

        stock: 12,
      },

      {
        color: "Orange",
        storage: "256GB",

        images: [
          "/products/iphone-17-pro/orange/front.jpg",
          "/products/iphone-17-pro/orange/back.jpg",
          "/products/iphone-17-pro/orange/side.jpg",
          "/products/iphone-17-pro/orange/camera.jpg",
        ],

        stock: 8,
      },

      {
        color: "Blue",
        storage: "512GB",

        images: [
          "/products/iphone-17-pro/blue/front.jpg",
          "/products/iphone-17-pro/blue/back.jpg",
          "/products/iphone-17-pro/blue/side.jpg",
          "/products/iphone-17-pro/blue/camera.jpg",
        ],

        stock: 6,
      },
    ],

    // ========================================================
    // EMI PLANS
    // ========================================================

    emiPlans: [
      {
        tenure: 3,
        monthlyPayment: 42467,
        interestRate: 0,
        cashback: 7500,
      },

      {
        tenure: 6,
        monthlyPayment: 21233,
        interestRate: 0,
        cashback: 7500,
      },

      {
        tenure: 9,
        monthlyPayment: 14156,
        interestRate: 0,
        cashback: 7500,
      },

      {
        tenure: 12,
        monthlyPayment: 10617,
        interestRate: 0,
        cashback: 7500,
      },

      {
        tenure: 24,
        monthlyPayment: 5931,
        interestRate: 10.5,
        cashback: 7500,
      },
    ],
  },

  // ==========================================================
  // SAMSUNG GALAXY S24 ULTRA
  // ==========================================================

  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    brand: "Samsung",
    category: "Smartphones",

    description:
      "Samsung Galaxy S24 Ultra featuring a premium titanium design, powerful performance and an advanced camera system.",

    mrp: 139999,
    price: 119999,

    images: [
      "/products/samsung-s24-ultra/black/front.jpg",
      "/products/samsung-s24-ultra/black/back.jpg",
      "/products/samsung-s24-ultra/black/side.jpg",
      "/products/samsung-s24-ultra/black/camera.jpg",
    ],

    variants: [
      {
        color: "Black",
        storage: "256GB",

        images: [
          "/products/samsung-s24-ultra/black/front.jpg",
          "/products/samsung-s24-ultra/black/back.jpg",
          "/products/samsung-s24-ultra/black/side.jpg",
          "/products/samsung-s24-ultra/black/camera.jpg",
        ],

        stock: 15,
      },

      {
        color: "Grey",
        storage: "512GB",

        images: [
          "/products/samsung-s24-ultra/grey/front.jpg",
          "/products/samsung-s24-ultra/grey/back.jpg",
          "/products/samsung-s24-ultra/grey/side.jpg",
          "/products/samsung-s24-ultra/grey/camera.jpg",
        ],

        stock: 10,
      },

      {
        color: "Violet",
        storage: "1TB",

        images: [
          "/products/samsung-s24-ultra/violet/front.jpg",
          "/products/samsung-s24-ultra/violet/back.jpg",
          "/products/samsung-s24-ultra/violet/side.jpg",
          "/products/samsung-s24-ultra/violet/camera.jpg",
        ],

        stock: 5,
      },
    ],

    emiPlans: [
      {
        tenure: 3,
        monthlyPayment: 39997,
        interestRate: 0,
        cashback: 6000,
      },
      {
        tenure: 6,
        monthlyPayment: 19999,
        interestRate: 0,
        cashback: 6000,
      },
      {
        tenure: 9,
        monthlyPayment: 13333,
        interestRate: 0,
        cashback: 6000,
      },
      {
        tenure: 12,
        monthlyPayment: 10000,
        interestRate: 0,
        cashback: 6000,
      },
      {
        tenure: 24,
        monthlyPayment: 5590,
        interestRate: 10.5,
        cashback: 6000,
      },
    ],
  },

  // ==========================================================
  // ONEPLUS 13
  // ==========================================================

  {
    name: "OnePlus 13",
    slug: "oneplus-13",
    brand: "OnePlus",
    category: "Smartphones",

    description:
      "OnePlus 13 with flagship performance, a stunning AMOLED display and a versatile camera system.",

    mrp: 84999,
    price: 74999,

    images: [
      "/products/oneplus-13/blue/front.jpg",
      "/products/oneplus-13/blue/back.jpg",
      "/products/oneplus-13/blue/side.jpg",
      "/products/oneplus-13/blue/camera.jpg",
    ],

    variants: [
      {
        color: "Blue",
        storage: "256GB",

        images: [
          "/products/oneplus-13/blue/front.jpg",
          "/products/oneplus-13/blue/back.jpg",
          "/products/oneplus-13/blue/side.jpg",
          "/products/oneplus-13/blue/camera.jpg",
        ],

        stock: 20,
      },

      {
        color: "Black",
        storage: "256GB",

        images: [
          "/products/oneplus-13/black/front.jpg",
          "/products/oneplus-13/black/back.jpg",
          "/products/oneplus-13/black/side.jpg",
          "/products/oneplus-13/black/camera.jpg",
        ],

        stock: 14,
      },

      {
        color: "White",
        storage: "512GB",

        images: [
          "/products/oneplus-13/white/front.jpg",
          "/products/oneplus-13/white/back.jpg",
          "/products/oneplus-13/white/side.jpg",
          "/products/oneplus-13/white/camera.jpg",
        ],

        stock: 9,
      },
    ],

    emiPlans: [
      {
        tenure: 3,
        monthlyPayment: 24997,
        interestRate: 0,
        cashback: 4000,
      },
      {
        tenure: 6,
        monthlyPayment: 12499,
        interestRate: 0,
        cashback: 4000,
      },
      {
        tenure: 9,
        monthlyPayment: 8333,
        interestRate: 0,
        cashback: 4000,
      },
      {
        tenure: 12,
        monthlyPayment: 6250,
        interestRate: 0,
        cashback: 4000,
      },
      {
        tenure: 24,
        monthlyPayment: 3495,
        interestRate: 10.5,
        cashback: 4000,
      },
    ],
  },
];

// ==========================================================
// SEED DATABASE
// ==========================================================

const seedDatabase = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products seeded successfully!");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);

    process.exit(1);
  }
};

seedDatabase();
