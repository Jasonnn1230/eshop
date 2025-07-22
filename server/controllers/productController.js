const Product = require('../models/Product');

// 取得所有商品
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 取得單一商品
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: '找不到此商品' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 新增商品 (Admin)
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, stock } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      images,
      stock
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 刪除商品 (Admin)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: '找不到此商品' });
    }

    // 修正這行
    await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: '商品已刪除' });
  } catch (err) {
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 更新商品 (Admin)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: '找不到此商品' });
    }

    // 更新欄位
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.images = req.body.images || product.images;
    product.stock = req.body.stock || product.stock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};



module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct
};

