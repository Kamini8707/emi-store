# EMI Store

A full-stack e-commerce application where users can browse smartphones, select product variants, choose an EMI plan, complete checkout, and place an EMI order.

The project uses React, Node.js, Express.js, and MongoDB Atlas.

---

## 🚀 Live Demo

**Frontend:**  
[Add your deployed frontend URL here]

**Backend API:**  
[Add your deployed backend URL here]

---

## 🎥 Project Demo

**Demo Video:**  
[Add Google Drive / YouTube video link here]

The video demonstrates:
- Frontend application
- Product and EMI selection
- Checkout and order placement
- Backend APIs
- MongoDB database and stored order

---

## 📌 Features

### Customer Features

- Browse smartphones
- Search by product name, brand, or category
- View product details and images
- Select color and storage variant
- View product price and discount
- Select EMI tenure
- View monthly EMI, interest rate, and cashback
- Check delivery availability using pincode
- Complete checkout
- Place EMI order
- View order confirmation
- View order history

### Backend Features

- REST APIs using Express.js
- MongoDB database with Mongoose
- Product and variant validation
- EMI plan validation
- Stock availability check
- Automatic stock reduction after successful order
- Order creation and order listing
- Error handling

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Vite
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- Mongoose
- REST API

### Database
- MongoDB
- MongoDB Atlas

### Tools
- Git
- GitHub
- VS Code
- MongoDB Atlas

---

## 📂 Project Structure

```text
emi-store/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── orderController.js
│   ├── models/
│   │   ├── Order.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   ├── seed/
│   │   └── seed.js
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   └── products/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderSuccess.jsx
│   │   │   └── Orders.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```
---
##⚙️ Setup and Run

1. Clone the repository
```
git clone https://github.com/Kamini8707/emi-store.git
cd emi-store
```
2. Backend Setup
```
cd backend
npm install
```

Create a .env file inside the backend folder:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

Start the backend:
```
npm run dev
```
Backend will run on:
```
http://localhost:5000
```
3. Seed the Database

From the backend folder:
```
npm run seed
```
This inserts the sample products, variants, and EMI plans into MongoDB.

4. Frontend Setup

Open another terminal:
```
cd frontend
npm install
npm run dev
```
Frontend will run on:
```
http://localhost:5173
```
---

##🔗 API Endpoints

### Products
Get all products
```
GET /api/products
```
Example:
```
GET http://localhost:5000/api/products
```
Example response:
```
{
  "success": true,
  "products": [
    {
      "_id": "product_id",
      "name": "iPhone 17 Pro",
      "brand": "Apple",
      "category": "Smartphone",
      "price": 127400,
      "mrp": 134900,
      "variants": [
        {
          "color": "Silver",
          "storage": "256GB",
          "stock": 10
        }
      ],
      "emiPlans": [
        {
          "tenure": 3,
          "monthlyPayment": 42467,
          "interestRate": 0,
          "cashback": 7500
        }
      ]
    }
  ]
}
```
### Orders
Create an order
```
POST /api/orders
```
Example request:
```
{
  "productId": "product_id",
  "color": "Silver",
  "storage": "256GB",
  "tenure": 3,
  "customer": {
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "address": "Lucknow, Uttar Pradesh",
    "pincode": "226001"
  }
}
```
Example response:
```
{
  "success": true,
  "message": "Order placed successfully",
  "order": {
    "orderId": "EMI644979",
    "productName": "iPhone 17 Pro",
    "productPrice": 127400,
    "status": "PLACED"
  }
}
```
Get all orders
```
GET /api/orders
```
Example:
```
GET http://localhost:5000/api/orders
```
Example response:
```
{
  "success": true,
  "orders": [
    {
      "orderId": "EMI644979",
      "productName": "iPhone 17 Pro",
      "productPrice": 127400,
      "status": "PLACED"
    }
  ]
}
```
---
## 🗄️ Database Schema
### Product

The Product collection contains:
```
Product
├── name
├── slug
├── brand
├── category
├── description
├── mrp
├── price
├── images[]
├── variants[]
│   ├── color
│   ├── storage
│   └── stock
└── emiPlans[]
    ├── tenure
    ├── monthlyPayment
    ├── interestRate
    └── cashback
```
### Order

The Order collection contains:
```
Order
├── orderId
├── product
├── productName
├── variant
│   ├── color
│   └── storage
├── customer
│   ├── name
│   ├── email
│   ├── phone
│   ├── address
│   └── pincode
├── emi
│   ├── tenure
│   ├── monthlyPayment
│   ├── interestRate
│   └── cashback
├── productPrice
├── status
├── createdAt
└── updatedAt
```
---
## 🔄 Order Flow
```
Browse Products
      ↓
View Product
      ↓
Select Color & Storage
      ↓
Select EMI Plan
      ↓
Checkout
      ↓
Validate Product / Variant / EMI / Stock
      ↓
Create Order
      ↓
Decrease Stock
      ↓
Order Success
```
📦 Database & Seed Data

The project includes:

- Product schema
- Order schema
- Product variants
- EMI plans
- Sample smartphone data
- Seed script for MongoDB

Run the seed script with:
```
npm run seed
```
---
## 👩‍💻 Author

Kamini Prajapati
