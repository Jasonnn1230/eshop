import { useEffect } from "react";
import { useRouter } from "next/router";

export default function IndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "buyer") {
      router.replace("/buyer-home");
    } else if (role === "seller") {
      router.replace("/seller-home");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null; 
}
