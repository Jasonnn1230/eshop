import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://eshop-mooi.onrender.com/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find((item) => item.id === product._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img
        src={product.images?.[0]}
        alt={product.name}
        className="w-64 h-64 object-cover my-4"
      />
      <p className="text-gray-700 text-xl">${product.price}</p>
      <p className="mt-2">{product.description}</p>

      {/* ✅ Add to Cart button */}
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
