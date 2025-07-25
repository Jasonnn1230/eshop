import { useState } from "react";
import { useRouter } from "next/router";

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        const res = await fetch("https://eshop-mooi.onrender.com/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Image }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Upload failed");

        // Adding image into array of images
        setForm((prevForm) => ({
          ...prevForm,
          images: [...prevForm.images, data.url],
        }));
      } catch (err) {
        console.error("Image upload failed:", err);
        alert("Image upload failed");
      } finally {
        setUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const { name, price, description, category, stock, images } = form;

    if (!name || !price || !description || !category || !stock || images.length === 0) {
      alert("Please fill al the field!");
      return;
    }

    try {
      const res = await fetch("https://eshop-mooi.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          price: parseFloat(price),
          description,
          category,
          stock: parseInt(stock),
          images,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      console.log("Product created:", data);
      router.push("/");
    } catch (error) {
      console.error("POST /api/products error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          name="name"
          placeholder="Product Name"
          className="w-full p-2 border"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price (e.g. 89.99)"
          className="w-full p-2 border"
          value={form.price}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category (e.g. Shoes)"
          className="w-full p-2 border"
          value={form.category}
          onChange={handleChange}
        />
        <input
          name="stock"
          placeholder="Stock Quantity"
          className="w-full p-2 border"
          value={form.stock}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full"
        />
        {uploading && <p>Uploading image...</p>}
        {form.images.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {form.images.map((url, i) => (
              <img key={i} src={url} alt={`img-${i}`} className="w-24 h-24 object-cover" />
            ))}
          </div>
        )}

        <textarea
          name="description"
          placeholder="Product Description"
          className="w-full p-2 border"
          value={form.description}
          onChange={handleChange}
        ></textarea>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={uploading}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
