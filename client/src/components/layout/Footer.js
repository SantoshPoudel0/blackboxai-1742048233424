import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">ShopNow</h3>
            <p className="text-gray-300">
              Your one-stop shop for all your needs. Quality products at the best prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white">Products</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-white">Cart</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=electronics" className="text-gray-300 hover:text-white">Electronics</Link>
              </li>
              <li>
                <Link to="/products?category=clothing" className="text-gray-300 hover:text-white">Clothing</Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="text-gray-300 hover:text-white">Accessories</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <i className="fas fa-envelope mr-2"></i>
                <a href="mailto:info@shopnow.com" className="hover:text-white">info@shopnow.com</a>
              </li>
              <li className="flex items-center text-gray-300">
                <i className="fas fa-phone mr-2"></i>
                <a href="tel:+1234567890" className="hover:text-white">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center text-gray-300">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span>123 Shop Street, City, Country</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <p className="text-gray-300">© 2024 ShopNow. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
