import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { product, selectedVariant, selectedPlan } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [error, setError] = useState("");

  // Agar user direct checkout page open kare
  if (!product || !selectedPlan || !selectedVariant) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h1 className="text-xl font-bold text-gray-800">
            Checkout information missing
          </h1>

          <Link
            to="/"
            className="inline-block mt-5 bg-purple-600 text-white px-6 py-3 rounded-lg"
          >
            Go to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      setError("Please fill all the details");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          productId: product._id,

          color: selectedVariant.color,
          storage: selectedVariant.storage,

          tenure: selectedPlan.tenure,

          customer: formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      navigate("/order-success", {
        state: {
          order: data.order,
        },
      });
    } catch (error) {
      console.error(error);
      setError(error.message || "Unable to place order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <Link to="/" className="text-2xl font-extrabold">
            <span className="text-gray-900">My</span>
            <span className="text-purple-600">Store</span>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-8">
        <Link
          to={`/product/${product.slug}`}
          className="text-purple-600 font-medium hover:underline"
        >
          ← Back to Product
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mt-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Customer Details */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-xl font-bold text-gray-900">
              Delivery Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House no., street, locality"
                  rows="3"
                  className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

            <button
              type="submit"
              className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
            >
              Confirm EMI Order
            </button>
          </form>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

            <img
              src={selectedVariant?.images?.[0] || product?.images?.[0]}
              alt={product.name}
              className="w-full h-52 object-contain bg-gray-50 rounded-lg mt-5"
            />

            <p className="text-sm text-purple-600 font-medium mt-5">
              {product.brand}
            </p>

            <h3 className="text-lg font-bold text-gray-900 mt-1">
              {product.name}
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              {selectedVariant?.color} • {selectedVariant?.storage}
            </p>

            <div className="border-t my-5" />

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Product Price</span>

              <span className="font-semibold">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between text-sm mt-3">
              <span className="text-gray-500">EMI Tenure</span>

              <span className="font-semibold">
                {selectedPlan.tenure} Months
              </span>
            </div>

            <div className="flex justify-between mt-4">
              <span className="text-gray-700 font-medium">Monthly EMI</span>

              <span className="text-xl font-bold text-purple-600">
                ₹{selectedPlan.monthlyPayment.toLocaleString("en-IN")}
              </span>
            </div>

            {selectedPlan.cashback > 0 && (
              <div className="bg-green-50 text-green-700 rounded-lg p-3 mt-5 text-sm font-medium">
                🎁 Cashback ₹{selectedPlan.cashback.toLocaleString("en-IN")}
              </div>
            )}

            <p className="text-xs text-gray-400 mt-4">
              Interest Rate: {selectedPlan.interestRate}%
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
