import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
        <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Order information not found
          </h1>

          <button
            onClick={() => navigate("/")}
            className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-8 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto">
          ✓
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mt-5">Order Placed!</h1>

        <p className="text-gray-500 mt-2">
          Your EMI order has been placed successfully.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-xl p-5 mt-6 text-left">
          <p className="text-sm text-gray-500">Order ID</p>

          <p className="font-bold text-gray-900">{order.orderId}</p>

          <div className="border-t my-4" />

          <p className="font-semibold text-gray-900">{order.productName}</p>

          <p className="text-sm text-gray-500 mt-1">
            {order.variant.color} • {order.variant.storage}
          </p>

          <p className="text-sm text-gray-500 mt-3">
            EMI: {order.emi.tenure} months
          </p>

          <p className="font-bold text-purple-600 mt-1">
            ₹{order.emi.monthlyPayment.toLocaleString("en-IN")}
            /month
          </p>

          {order.emi.cashback > 0 && (
            <p className="text-sm text-green-600 font-medium mt-3">
              Cashback: ₹{order.emi.cashback.toLocaleString("en-IN")}
            </p>
          )}

          <p className="text-xs text-gray-400 mt-3">
            Interest Rate: {order.emi.interestRate}%
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
