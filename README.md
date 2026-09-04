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
