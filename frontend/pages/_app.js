// frontend/pages/_app.js
import "../styles/globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    console.log("Stored role from localStorage:", storedRole); // DEBUG
    setRole(storedRole);
  }, []);

  if (role === null) {
    return null; 
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-orange-600 text-white px-6 py-5 flex justify-between items-center">
        <h1 className="font-bold text-lg flex items-center gap-2">
          wwShop
        </h1>
        <div className="space-x-6">
          <a
            onClick={() => {
              console.log("Current role on click:", role); // DEBUG
              if (role === "seller") {
                window.location.href = "/seller-home";
              } else if (role === "buyer") {
                window.location.href = "/buyer-home";
              } else {
                window.location.href = "/";
              }
            }}
            className="hover:underline cursor-pointer"
          >
            Home
          </a>

          <Link href="/cart" className="hover:underline">
            Cart
          </Link>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <Link href="/register" className="hover:underline">
            Register
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main className="p-4">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
