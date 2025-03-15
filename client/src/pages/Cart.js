import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  // This will be replaced with actual cart context/state management later
  const [cartItems, setCartItems] = useState([
    {
      _id: '1',
      name: 'Sample Product 1',
      price: 99.99,
      image: 'https://via.placeholder.com/150',
      quantity: 2,
      stock: 10
    },
    {
      _id: '2',
      name: 'Sample Product 2',
      price: 49.99,
      image: 'https://via.placeholder.com/150',
      quantity: 1,
      stock: 5
    }
  ]);

  const updateQuantity = (productId, newQuantity) => {
    setCartItems(items =>
      items.map(item =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.stock)) }
          : item
      )
    );
  };

  const removeItem = (productId) => {
    setCartItems(items => items.filter(item => item._id !== productId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            {cartItems.map(item => (
              <div key={item._id} className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />

                {/* Product Details */}
                <div className="flex-grow ml-6">
                  <h3 className="text-lg font-semibold">
                    <Link to={`/products/${item._id}`} className="hover:text-blue-600">
                      {item.name}
                    </Link>
                  </h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center mx-6">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-3 py-1 border border-gray-300 rounded-l hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                    className="w-16 px-3 py-1 border-t border-b border-gray-300 text-center focus:outline-none"
                  />
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-3 py-1 border border-gray-300 rounded-r hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="w-24 text-right">
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item._id)}
                  className="ml-6 text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-semibold">${calculateTax().toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/products"
              className="block text-center mt-4 text-blue-600 hover:text-blue-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
