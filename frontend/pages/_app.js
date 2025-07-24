import "../styles/globals.css";
import Link from "next/link";

export default function App({ Component, pageProps }) {
  return (
    <div>
      {/* Top Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
        <h1 className="font-bold text-lg flex items-center gap-2">
          🛍️ eShop
        </h1>
        <div className="space-x-6">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/cart" className="hover:underline">Cart</Link>
          <Link href="/login" className="hover:underline">Login</Link>
          <Link href="/register" className="hover:underline">Register</Link>
        </div>
      </nav>

      {/* Main content */}
      <main className="p-4">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

