import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <i className="fas fa-exclamation-circle text-6xl text-blue-600"></i>
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Go Back Home
          </Link>
          <Link
            to="/products"
            className="block w-full bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition duration-300"
          >
            Browse Products
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-gray-500">
          Need help?{' '}
          <Link to="/contact" className="text-blue-600 hover:text-blue-800">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}

export default NotFound;
