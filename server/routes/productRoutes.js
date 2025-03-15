const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts
} = require('../controllers/productController');

const {
  createProductValidator,
  updateProductValidator,
  validateMongoId
} = require('../validators/productValidator');

const { validateRequest } = require('../middleware/errorMiddleware');
const { protect, isAdmin, mockAdminAuth } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/:id', validateMongoId, validateRequest, getProductById);

// Protected routes (Admin only)
// For development, we're using mockAdminAuth instead of protect & isAdmin
router.post(
  '/',
  mockAdminAuth,
  createProductValidator,
  validateRequest,
  createProduct
);

router.put(
  '/:id',
  mockAdminAuth,
  updateProductValidator,
  validateRequest,
  updateProduct
);

router.delete(
  '/:id',
  mockAdminAuth,
  validateMongoId,
  validateRequest,
  deleteProduct
);

module.exports = router;
