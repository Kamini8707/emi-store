import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:5000/api/orders");

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();

        setOrders(data.orders || []);
      } catch (error) {
        console.error(error);
        setError("Unable to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-extrabold tracking-tight"
          >
            <span className="text-gray-900">My</span>
            <span className="text-purple-600">Store</span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="text-sm font-medium text-gray-700 hover:text-purple-600"
          >
            Continue Shopping
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>

        <p className="mt-1 text-gray-500">
          View your EMI orders and payment details
        </p>

        {/* LOADING */}
        {loading && (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center">
            <p className="text-gray-600">Loading orders...</p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center">
            <p className="text-red-500">{error}</p>

            <button
              onClick={() => navigate("/")}
              className="mt-5 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
            >
              Continue Shopping
            </button>
          </div>
        )}

        {/* NO ORDERS */}
        {!loading && !error && orders.length === 0 && (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mb-4 text-5xl">📦</div>

            <h2 className="text-xl font-semibold text-gray-900">
              No orders yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your EMI orders will appear here after you make a purchase.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
            >
              Start Shopping
            </button>
          </div>
        )}

        {/* ORDERS */}
        {!loading && !error && orders.length > 0 && (
          <div className="mt-8 space-y-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                {/* TOP */}
                <div className="flex flex-col justify-between gap-3 border-b pb-4 sm:flex-row">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>

                    <p className="text-lg font-bold text-gray-900">
                      {order.orderId}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-sm text-gray-500">Status</p>

                    <span className="inline-block rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-600">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* PRODUCT */}
                <div className="py-5">
                  <h2 className="text-xl font-bold text-gray-900">
                    {order.productName}
                  </h2>

                  <p className="mt-1 text-gray-500">
                    {order.variant?.color} • {order.variant?.storage}
                  </p>
                </div>

                {/* EMI */}
                <div className="grid grid-cols-1 gap-4 rounded-xl bg-purple-50 p-4 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-gray-500">EMI Tenure</p>

                    <p className="mt-1 font-bold text-gray-900">
                      {order.emi?.tenure} Months
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Monthly EMI</p>

                    <p className="mt-1 text-xl font-bold text-purple-600">
                      ₹
                      {Number(order.emi?.monthlyPayment || 0).toLocaleString(
                        "en-IN",
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Interest</p>

                    <p className="mt-1 font-bold text-gray-900">
                      {order.emi?.interestRate}%
                    </p>
                  </div>
                </div>

                {/* PRICE / CASHBACK */}
                <div className="mt-5 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Product Price</p>

                    <p className="font-bold text-gray-900">
                      ₹{Number(order.productPrice || 0).toLocaleString("en-IN")}
                    </p>
                  </div>

                  {order.emi?.cashback > 0 && (
                    <div className="text-left sm:text-right">
                      <p className="text-sm text-gray-500">Cashback</p>

                      <p className="font-bold text-green-600">
                        ₹{Number(order.emi.cashback).toLocaleString("en-IN")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Orders;
