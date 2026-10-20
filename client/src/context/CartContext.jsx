import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('darkwear_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('darkwear_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const addToCart = (product, selectedSize = 'L', selectedColor = null, quantity = 1) => {
    const size = selectedSize || 'L';
    const color = selectedColor || (product.colors && product.colors[0]?.name) || 'Onyx Black';
    const image = (product.images && product.images[0]) || '';
    const productId = product._id || product.id;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.productId === productId && item.size === size
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            productId,
            name: product.name,
            slug: product.slug,
            image,
            price: Number(product.price),
            originalPrice: product.originalPrice,
            size,
            color,
            quantity: Number(quantity)
          }
        ];
      }
    });

    showToast(`Added "${product.name}" (${size}) to your bag.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size))
    );
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: Number(quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscountPercent(0);
    setPromoCode('');
  };

  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'DARK15' || clean === 'STREET15') {
      setDiscountPercent(15);
      setPromoCode(clean);
      showToast('15% Streetwear Promo applied!');
      return { success: true, message: '15% discount applied!' };
    } else if (clean === 'DARKWEAR20') {
      setDiscountPercent(20);
      setPromoCode(clean);
      showToast('20% VIP Drop Discount applied!');
      return { success: true, message: '20% VIP discount applied!' };
    } else {
      return { success: false, message: 'Invalid promo code. Try "DARK15".' };
    }
  };

  // Calculations
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * (discountPercent / 100)) * 100) / 100;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const shippingPrice = subtotal > 75 || subtotal === 0 ? 0 : 9; // Free shipping over $75
  const taxPrice = Math.round(subtotalAfterDiscount * 0.08 * 100) / 100;
  const totalPrice = Math.round((subtotalAfterDiscount + shippingPrice + taxPrice) * 100) / 100;

  const value = {
    cartItems,
    totalItemsCount,
    subtotal,
    discountAmount,
    discountPercent,
    promoCode,
    shippingPrice,
    taxPrice,
    totalPrice,
    isCartOpen,
    toastMessage,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyPromoCode,
    toggleCart: () => setIsCartOpen((prev) => !prev),
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false)
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
