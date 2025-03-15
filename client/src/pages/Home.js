import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-75"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Welcome to ShopNow</h1>
            <p className="text-xl mb-8">Discover amazing products at unbeatable prices. Shop now and experience the difference.</p>
            <Link 
              to="/products" 
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Electronics Category */}
            <div className="relative rounded-lg overflow-hidden group">
              <img 
                src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg" 
                alt="Electronics" 
                className="w-full h-64 object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Link 
                  to="/products?category=electronics" 
                  className="text-white text-2xl font-bold hover:underline"
                >
                  Electronics
                </Link>
              </div>
            </div>

            {/* Clothing Category */}
            <div className="relative rounded-lg overflow-hidden group">
              <img 
                src="https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg" 
                alt="Clothing" 
                className="w-full h-64 object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Link 
                  to="/products?category=clothing" 
                  className="text-white text-2xl font-bold hover:underline"
                >
                  Clothing
                </Link>
              </div>
            </div>

            {/* Accessories Category */}
            <div className="relative rounded-lg overflow-hidden group">
              <img 
                src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg" 
                alt="Accessories" 
                className="w-full h-64 object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Link 
                  to="/products?category=accessories" 
                  className="text-white text-2xl font-bold hover:underline"
                >
                  Accessories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Shipping */}
            <div className="text-center">
              <div className="text-4xl text-blue-600 mb-4">
                <i className="fas fa-truck"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on all orders over $50</p>
            </div>

            {/* Secure Payment */}
            <div className="text-center">
              <div className="text-4xl text-blue-600 mb-4">
                <i className="fas fa-lock"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </div>

            {/* Quality Support */}
            <div className="text-center">
              <div className="text-4xl text-blue-600 mb-4">
                <i className="fas fa-headset"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Support</h3>
              <p className="text-gray-600">24/7 dedicated customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">Stay updated with our latest products and offers.</p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
