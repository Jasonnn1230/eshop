const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '請輸入商品名稱']
  },
  description: {
    type: String,
    required: [true, '請輸入商品描述']
  },
  price: {
    type: Number,
    required: [true, '請輸入商品價格']
  },
  category: {
    type: String,
    required: [true, '請輸入商品分類']
  },
  images: [
    {
      type: String, // 儲存圖片 URL
      required: true
    }
  ],
  stock: {
    type: Number,
    required: [true, '請輸入庫存數量'],
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
