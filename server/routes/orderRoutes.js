const express = require('express');
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  markOrderAsPaid,
  markOrderAsDelivered
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createOrder); // Create order
router.get('/myorders', protect, getMyOrders); // Get current user orders
router.get('/', protect, admin, getAllOrders); // Admin: Get all orders
router.get('/:id', protect, getOrderById); // Get single order
router.put('/:id/pay', protect, markOrderAsPaid); // Update order to paid
router.put('/:id/deliver', protect, admin, markOrderAsDelivered); // Admin: Update order to delivered

module.exports = router;
