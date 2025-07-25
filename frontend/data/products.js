export async function getProducts() {
  const res = await fetch("https://eshop-mooi.onrender.com/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

