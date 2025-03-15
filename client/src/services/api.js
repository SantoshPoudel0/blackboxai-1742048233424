import axios from 'axios';

/**
 * @typedef {Object} Product
 * @property {string} id - Product unique identifier
 * @property {string} name - Product name
 * @property {number} price - Product price
 * @property {string} description - Product description
 * @property {string} category - Product category
 * @property {number} stock - Available stock
 */

/**
 * @typedef {Object} ApiError
 * @property {string} message - Error message
 * @property {number} status - HTTP status code
 */

/**
 * @typedef {Object} LoginCredentials
 * @property {string} email - User email
 * @property {string} password - User password
 */

/**
 * @typedef {Object} AuthResponse
 * @property {string} token - JWT token
 * @property {Object} user - User information
 */

// Create axios instance with default config
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message;
        
        // Handle different HTTP error status codes
        switch (error.response?.status) {
            case 401:
                localStorage.removeItem('token');
                window.location.href = '/login';
                break;
            case 403:
                console.error('Permission denied');
                break;
            case 404:
                console.error('Resource not found');
                break;
            case 422:
                console.error('Validation error');
                break;
            case 500:
                console.error('Server error');
                break;
            default:
                console.error('Network error');
        }
        
        return Promise.reject({
            message,
            status: error.response?.status
        });
    }
);

/**
 * Product-related API calls
 * @namespace
 */
const productAPI = {
    /**
     * Get all products
     * @param {Object} [params] - Query parameters
     * @returns {Promise<Product[]>} Array of products
     * @throws {ApiError}
     */
    getProducts: async (params = {}) => {
        const response = await api.get('/products', { params });
        return response.data;
    },

    /**
     * Get single product by ID
     * @param {string} id - Product ID
     * @returns {Promise<Product>} Product details
     * @throws {ApiError}
     */
    getProductById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    /**
     * Create new product (admin only)
     * @param {Product} productData - Product information
     * @returns {Promise<Product>} Created product
     * @throws {ApiError}
     */
    createProduct: async (productData) => {
        const response = await api.post('/products', productData);
        return response.data;
    },

    /**
     * Update product (admin only)
     * @param {string} id - Product ID
     * @param {Partial<Product>} productData - Updated product information
     * @returns {Promise<Product>} Updated product
     * @throws {ApiError}
     */
    updateProduct: async (id, productData) => {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    },

    /**
     * Delete product (admin only)
     * @param {string} id - Product ID
     * @returns {Promise<void>}
     * @throws {ApiError}
     */
    deleteProduct: async (id) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    }
};

/**
 * Authentication-related API calls
 * @namespace
 */
const authAPI = {
    /**
     * Login user
     * @param {LoginCredentials} credentials - User credentials
     * @returns {Promise<AuthResponse>} Authentication response
     * @throws {ApiError}
     */
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        const { token } = response.data;
        localStorage.setItem('token', token);
        return response.data;
    },

    /**
     * Logout user
     * @returns {void}
     */
    logout: () => {
        localStorage.removeItem('token');
    },

    /**
     * Check authentication status
     * @returns {Promise<Object>} User information
     * @throws {ApiError}
     */
    checkAuth: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    }
};

export { productAPI, authAPI };
