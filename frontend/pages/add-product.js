import { useState } from "react";
import { useRouter } from "next/router";

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("新增商品（模擬）", form);
    alert("已新增（目前尚未儲存，需手動加入 data/products.js）");
    router.push("/");
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">add product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          name="name"
          placeholder="商品名稱"
          className="w-full p-2 border"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="價格（如 $19.99）"
          className="w-full p-2 border"
          value={form.price}
          onChange={handleChange}
        />
        <input
          name="image"
          placeholder="圖片路徑（如 /images/shirt.jpg）"
          className="w-full p-2 border"
          value={form.image}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="商品描述"
          className="w-full p-2 border"
          value={form.description}
          onChange={handleChange}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          add product
        </button>
      </form>
    </div>
  );
}
