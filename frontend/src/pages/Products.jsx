import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch("https://emi-store-backend.onrender.com/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products || []);
      } catch (error) {
        console.error(error);
        setError("Unable to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Search
  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    return (
      product.name?.toLowerCase().includes(searchText) ||
      product.brand?.toLowerCase().includes(searchText) ||
      product.category?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* LOGO */}
          <button onClick={() => navigate("/")} className="flex items-center">
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              My
            </span>

            <span className="text-2xl font-extrabold tracking-tight text-blue-400">
              Store
            </span>
          </button>

          {/* SEARCH */}
          <div className="mx-8 hidden max-w-md flex-1 md:flex">
            <div className="flex w-full items-center rounded-lg bg-gray-100 px-4 py-2.5">
              <span className="mr-2 text-gray-400">⌕</span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent text-sm text-gray-700 outline-none"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/orders")}
              className="text-sm font-medium text-gray-700 hover:text-purple-600"
            >
              My Orders
            </button>

            <button
              onClick={() => navigate("/orders")}
              className="text-xl transition hover:scale-110"
              title="My Orders"
            >
              🛒
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Shop on EMI</h2>

          <p className="mt-1 text-gray-500">
            Get your favourite products with easy monthly payments
          </p>
        </div>

        {/* LOADING */}
        {loading && <p className="text-gray-600">Loading products...</p>}

        {/* ERROR */}
        {error && <p className="text-red-500">{error}</p>}

        {/* PRODUCTS */}
        {!loading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="rounded-xl bg-white p-10 text-center">
                <p className="text-gray-500">No products found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-lg"
                  >
                    {/* IMAGE */}
                    <div className="bg-gray-50">
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="h-64 w-full object-contain"
                      />
                    </div>

                    {/* INFO */}
                    <div className="p-5">
                      <p className="text-sm font-medium text-purple-600">
                        {product.brand}
                      </p>

                      <h3 className="mt-1 text-xl font-semibold text-gray-800">
                        {product.name}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                        {product.description}
                      </p>

                      {/* PRICE */}
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">
                          MRP: ₹
                          {Number(product.mrp || 0).toLocaleString("en-IN")}
                        </p>

                        <p className="text-2xl font-bold text-gray-900">
                          ₹{Number(product.price || 0).toLocaleString("en-IN")}
                        </p>
                      </div>

                      {/* EMI */}
                      {product.emiPlans?.length > 0 && (
                        <p className="mt-2 text-sm font-medium text-green-600">
                          EMI available from ₹
                          {Math.min(
                            ...product.emiPlans.map((plan) =>
                              Number(plan.monthlyPayment),
                            ),
                          ).toLocaleString("en-IN")}
                          /month
                        </p>
                      )}

                      {/* VIEW */}
                      <button
                        onClick={() => navigate(`/product/${product.slug}`)}
                        className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                      >
                        View Product
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Products;
