require('dotenv').config(); // ← 加上這行
const express = require('express');
const router = express.Router();
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST /api/upload
router.post('/', async (req, res) => {
  try {
    const { image } = req.body; // image 是 base64 或圖片 URL

    const result = await cloudinary.uploader.upload(image, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET, // optional if unsigned
    });

    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed', message: err.message });
  }
});

module.exports = router;

