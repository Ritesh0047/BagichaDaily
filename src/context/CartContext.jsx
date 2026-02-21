import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('bagicha-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('bagicha-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, weight = '1kg') => {
    setCart(prev => {
      const existing = prev.find(
        item => item.id === product.id && item.weight === weight
      );
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.weight === weight
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, weight }];
    });
  };

  const removeFromCart = (productId, weight) => {
    setCart(prev =>
      prev.filter(item => !(item.id === productId && item.weight === weight))
    );
  };

  const updateQuantity = (productId, weight, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId, weight);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId && item.weight === weight
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getWeightPrice = (price, weight) => {
    const multipliers = { '1kg': 1, '5kg': 4.5, '10kg': 8.5 };
    return Math.round(price * (multipliers[weight] || 1));
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + getWeightPrice(item.price, item.weight) * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getWeightPrice,
        cartTotal,
        cartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
