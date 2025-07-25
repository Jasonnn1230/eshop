// pages/api/products/index.js
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: "Failed to create product", message: err.message });
    }
  } else if (req.method === "GET") {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
