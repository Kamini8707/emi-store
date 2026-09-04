import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");

  const [selectedImage, setSelectedImage] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/products/slug/${slug}`,
        );

        if (!response.ok) {
          throw new Error("Product nahi mila");
        }

        const data = await response.json();

        const productData = data.product || data;

        setProduct(productData);

        // First variant select
        if (productData.variants?.length > 0) {
          const firstVariant = productData.variants[0];

          setSelectedColor(firstVariant.color);
          setSelectedStorage(firstVariant.storage);
        }

        // First EMI plan select by default
        if (productData.emiPlans?.length > 0) {
          setSelectedPlan(productData.emiPlans[0]);
        }
      } catch (err) {
        console.error(err);
        setError("Product load nahi ho pa raha hai.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading product...</p>
      </div>
    );
  }

  // Error
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-500">
            {error || "Product not found"}
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-4 rounded-lg bg-purple-600 px-6 py-2 text-white hover:bg-purple-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Available colors
  const colors = [
    ...new Set(product.variants?.map((variant) => variant.color)),
  ];

  // Available storage according to selected color
  const availableStorages = [
    ...new Set(
      product.variants
        ?.filter((variant) => variant.color === selectedColor)
        .map((variant) => variant.storage),
    ),
  ];

  // Current selected variant
  let selectedVariant = product.variants?.find(
    (variant) =>
      variant.color === selectedColor && variant.storage === selectedStorage,
  );

  // Fallback variant
  if (!selectedVariant) {
    selectedVariant = product.variants?.find(
      (variant) => variant.color === selectedColor,
    );
  }

  // Current images
  const currentImages =
    selectedVariant?.images?.length > 0
      ? selectedVariant.images
      : product.images || [];

  // Discount
  const discount =
    product.mrp && product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  // Color change
  const handleColorChange = (color) => {
    setSelectedColor(color);

    const firstVariantOfColor = product.variants?.find(
      (variant) => variant.color === color,
    );

    if (firstVariantOfColor) {
      setSelectedStorage(firstVariantOfColor.storage);
    }

    setSelectedImage(0);
  };

  // Storage change
  const handleStorageChange = (storage) => {
    setSelectedStorage(storage);
    setSelectedImage(0);
  };

  // EMI change
  const handleEmiSelect = (plan) => {
    setSelectedPlan(plan);
  };

  // Buy
  const handleBuy = () => {
    if (!selectedVariant) {
      alert("Please select a product variant");
      return;
    }

    if (!selectedPlan) {
      alert("Please select an EMI plan");
      return;
    }

    navigate("/checkout", {
      state: {
        product,
        selectedVariant,
        selectedPlan,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="text-3xl font-bold tracking-tight"
          >
            My<span className="text-blue-400">Store</span>
          </button>

          {/* Search */}
          <div className="hidden w-[400px] lg:block">
            <div className="flex h-12 items-center rounded-xl bg-gray-100 px-4">
              <span className="mr-3 text-gray-400">⌕</span>

              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/orders")}
              className="font-medium text-gray-800 hover:text-purple-600"
            >
              My Orders
            </button>

            <button
              onClick={() => navigate("/orders")}
              className="text-2xl"
              title="My Orders"
            >
              🛒
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-[1500px] px-4 py-5 lg:px-8">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[58%_42%]">
          {/* LEFT */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="grid grid-cols-[100px_1fr] gap-5">
              {/* Thumbnails */}
              <div className="flex flex-col gap-4">
                {currentImages.slice(0, 4).map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() => setSelectedImage(index)}
                    className={`flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-xl border-2 bg-gray-50 p-1 transition ${
                      selectedImage === index
                        ? "border-purple-600"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full rounded-lg object-contain"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex min-h-[620px] items-center justify-center overflow-hidden rounded-2xl bg-gray-50">
                {currentImages[selectedImage] ? (
                  <img
                    src={currentImages[selectedImage]}
                    alt={product.name}
                    className="h-full max-h-[620px] w-full object-contain"
                  />
                ) : (
                  <div className="text-gray-400">Image not available</div>
                )}
              </div>
            </div>

            {/* COLOR & STORAGE */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* COLOR */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Color</h3>

                  <span className="text-sm text-gray-500">{selectedColor}</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`rounded-xl border px-5 py-3 text-sm font-medium transition ${
                        selectedColor === color
                          ? "border-purple-600 bg-purple-50 text-purple-600"
                          : "border-gray-300 bg-white text-gray-700 hover:border-purple-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* STORAGE */}
              <div>
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Storage
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {availableStorages.map((storage) => (
                    <button
                      key={storage}
                      onClick={() => handleStorageChange(storage)}
                      className={`rounded-xl border px-5 py-3 text-sm font-medium transition ${
                        selectedStorage === storage
                          ? "border-purple-600 bg-purple-50 text-purple-600"
                          : "border-gray-300 bg-white text-gray-700 hover:border-purple-400"
                      }`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT */}
          <section className="rounded-2xl border border-gray-200 bg-white p-7">
            {/* Brand */}
            <p className="mb-2 text-lg font-semibold text-purple-600">
              {product.brand}
            </p>

            {/* Name */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
              {product.name}
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600">
              {product.description}
            </p>

            {/* Price */}
            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{Number(product.price || 0).toLocaleString("en-IN")}
                </span>

                <span className="text-lg text-gray-400 line-through">
                  ₹{Number(product.mrp || 0).toLocaleString("en-IN")}
                </span>

                {discount > 0 && (
                  <span className="text-lg font-semibold text-green-600">
                    {discount}% off
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Inclusive of all taxes
              </p>

              {product.mrp > product.price && (
                <p className="mt-2 font-semibold text-green-600">
                  You save ₹
                  {Number(product.mrp - product.price).toLocaleString("en-IN")}
                </p>
              )}
            </div>

            <div className="my-6 border-t border-gray-200" />

            {/* EMI */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Choose your EMI
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Easy monthly payments
                  </p>
                </div>

                <span className="hidden rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-600 sm:block">
                  0% EMI available
                </span>
              </div>

              {/* EMI PLANS */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {product.emiPlans?.map((plan) => (
                  <button
                    key={plan.tenure}
                    onClick={() => handleEmiSelect(plan)}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      selectedPlan?.tenure === plan.tenure
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 bg-white hover:border-purple-300"
                    }`}
                  >
                    <p className="text-gray-500">{plan.tenure} Months</p>

                    <p className="mt-1 text-xl font-bold">
                      ₹{Number(plan.monthlyPayment).toLocaleString("en-IN")}
                    </p>

                    <p className="text-sm text-gray-500">
                      {plan.interestRate === 0
                        ? "No interest"
                        : `${plan.interestRate}% interest`}
                    </p>
                  </button>
                ))}
              </div>

              {/* SELECTED EMI SUMMARY */}
              {selectedPlan && (
                <div className="mt-5 rounded-xl bg-purple-50 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Selected EMI</p>

                      <p className="mt-1 text-xl font-bold text-gray-900">
                        ₹
                        {Number(
                          selectedPlan.monthlyPayment || 0,
                        ).toLocaleString("en-IN")}{" "}
                        × {selectedPlan.tenure} months
                      </p>
                    </div>

                    {selectedPlan.cashback > 0 && (
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Cashback</p>

                        <p className="text-lg font-bold text-green-600">
                          ₹
                          {Number(selectedPlan.cashback).toLocaleString(
                            "en-IN",
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* BUY */}
              <button
                onClick={handleBuy}
                className="mt-4 w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-700"
              >
                Buy on EMI
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ProductDetails;
