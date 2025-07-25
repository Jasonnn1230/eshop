import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "../data/products";

export default function SellerHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("https://eshop-mooi.onrender.com/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    }

    loadProducts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome, Seller</h1>

      <Link href="/add-product" className="text-blue-600 underline">
        ➕ Add Product
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <Link href={`/product/${product._id}`}>
              <img
                src={product.images?.[0] || "/placeholder.jpg"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
