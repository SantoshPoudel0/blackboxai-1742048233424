import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item._id === product._id);
      
      if (existingItem) {
        // Update quantity if item exists
        return currentItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      // Add new item if it doesn't exist
      return [...currentItems, { ...product, quantity }];
    });
  };

  const removeItem = (productId) => {
    setItems(currentItems => 
      currentItems.filter(item => item._id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item._id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.1; // 10% tax
  };

  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  const isInCart = (productId) => {
    return items.some(item => item._id === productId);
  };

  const getItem = (productId) => {
    return items.find(item => item._id === productId);
  };

  const value = {
    items,
    loading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getSubtotal,
    getTax,
    getTotal,
    isInCart,
    getItem
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for cart calculations
export const useCartCalculations = () => {
  const { items } = useCart();

  const calculations = {
    subtotal: items.reduce((total, item) => total + (item.price * item.quantity), 0),
    tax: items.reduce((total, item) => total + (item.price * item.quantity), 0) * 0.1,
    shipping: 0, // Can be modified based on shipping options
    get total() {
      return this.subtotal + this.tax + this.shipping;
    }
  };

  return calculations;
};

export default CartContext;
