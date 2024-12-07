import React, { createContext, useContext, useState, useEffect } from "react";

// Define types for Cart Context
interface CartContextType {
  cartCount: number;
  setCartCount: (count: number) => void;
  incrementCartCount: () => void;
  decrementCartCount: () => void;
}

// Create Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log("CartProvider rendered");

  // Initialize `cartCount` from localStorage or default to 0
  const [cartCount, setCartCount] = useState<number>(() => {
    const storedCartCount = localStorage.getItem("cartCount");
    return storedCartCount ? parseInt(storedCartCount, 10) : 0;
  });

  // Update localStorage whenever `cartCount` changes
  useEffect(() => {
    // Only update localStorage if the cartCount has changed
    const storedCartCount = localStorage.getItem("cartCount");
    if (storedCartCount !== String(cartCount)) {
      localStorage.setItem("cartCount", String(cartCount));
    }
  }, [cartCount]);

  // Functions to modify the cart count
  const incrementCartCount = () => setCartCount((prev) => prev + 1);
  const decrementCartCount = () =>
    setCartCount((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        incrementCartCount,
        decrementCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to Access Cart Context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
