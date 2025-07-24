import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.quantity * parseFloat(item.price), 0);

  const handleRemove = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × ${item.price}
                  </p>
                </div>
                <div>
                  <p>${(item.quantity * parseFloat(item.price)).toFixed(2)}</p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right font-bold text-lg mt-4">
              Total: ${getTotal().toFixed(2)}
            </div>

            <Link href="/checkout">
              <button className="bg-blue-500 text-white px-6 py-2 mt-4 rounded hover:bg-blue-600">
                Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
