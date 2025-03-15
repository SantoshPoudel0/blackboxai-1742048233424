import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productAPI = {
  // Get all products with optional search and filter params
  getAllProducts: (params) => api.get('/products', { params }),
  
  // Get a single product by ID
  getProductById: (id) => api.get(`/products/${id}`),
  
  // Create a new product (admin only)
  createProduct: (productData) => api.post('/products', productData),
  
  // Update a product (admin only)
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  
  // Delete a product (admin only)
  deleteProduct: (id) => api.delete(`/products/${id}`),
  
  // Search products
  searchProducts: (query) => api.get(`/products/search?q=${query}`),
};

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

export default api;
