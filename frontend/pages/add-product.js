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

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setForm({ ...form, image: data.secure_url });
    setUploading(false);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.name || !form.price || !form.image || !form.description) {
    alert("Please fill in all fields");
    return;
  }

  try {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
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
          placeholder="Price (e.g. $19.99)"
          className="w-full p-2 border"
          value={form.price}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full"
        />
        {uploading && <p>Uploading image...</p>}
        {form.image && (
          <img src={form.image} alt="Preview" className="w-32 h-32 object-cover" />
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
