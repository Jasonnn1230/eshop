const express = require('express');
const { 
  getAllProducts, 
  getProductById, 
  createProduct,
  deleteProduct,
  updateProduct
} = require('../controllers/productController.js');

const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', protect, admin, createProduct);
router.delete('/:id', protect, admin, deleteProduct);
router.put('/:id', protect, admin, updateProduct);



module.exports = router;
