import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../services/api';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: '',
    minPrice: '',
    maxPrice: '',
    sort: 'newest'
  });

  useEffect(() => {
    fetchProducts();
  }, [filters.category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getProducts({ category: filters.category });
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Update URL params
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.search) params.set('search', filters.search);
    setSearchParams(params);
  };

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.search.toLowerCase())
    )
    .filter(product => 
      (!filters.minPrice || product.price >= Number(filters.minPrice)) &&
      (!filters.maxPrice || product.price <= Number(filters.maxPrice))
    )
    .sort((a, b) => {
      switch (filters.sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default: // newest
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  return (
    <div className="container mx-auto px-4">
      {/* Search and Filter Section */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div>
            <select
              value={filters.sort}
              onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </form>

        {/* Price Range Filter */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8 text-red-500">
          {error}
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <img
                src={product.image || 'https://via.placeholder.com/300'}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">${product.price}</span>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                    onClick={() => {/* Add to cart logic */}}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Products Found */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
}

export default Products;
