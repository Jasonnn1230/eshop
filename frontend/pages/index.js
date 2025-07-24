import { products } from "../data/products";
import Link from "next/link";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <Link href="/add-product" className="text-blue-600 underline mb-4 block">
        ➕ add more product
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Link href={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover cursor-pointer"
              />
            </Link>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
