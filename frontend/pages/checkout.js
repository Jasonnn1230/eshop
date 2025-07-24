// frontend/pages/checkout.js
import { useState, useEffect } from "react";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const total = cart.reduce((sum, item) => {
    const price = typeof item.price === "string" ? parseFloat(item.price.replace("$", "")) : item.price;
    return sum + price * item.quantity;
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    localStorage.removeItem("cart");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
        <p>We’ve sent a confirmation to <span className="font-semibold">{email}</span>.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>
                ${(
                    (typeof item.price === "string"
                    ? parseFloat(item.price.replace("$", ""))
                    : item.price) * item.quantity
                ).toFixed(2)}
            </span>

          </div>
        ))}
        <div className="border-t pt-2 font-bold text-lg flex justify-between">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Customer Info</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            className="w-full border p-2 rounded"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Email</label>
          <input
            className="w-full border p-2 rounded"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}
