import React, { createContext, useContext, useState, useEffect } from "react";

interface CartContextType {
  cartCount: number;
  setCartCount: (count: number) => void;
  incrementCartCount: () => void;
  decrementCartCount: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartCount, setCartCount] = useState<number>(() => {
    const storedCartCount = localStorage.getItem("cartCount");
    return storedCartCount ? parseInt(storedCartCount, 10) : 0;
  });

  useEffect(() => {
    const storedCartCount = localStorage.getItem("cartCount");
    if (storedCartCount !== String(cartCount)) {
      localStorage.setItem("cartCount", String(cartCount));
    }
  }, [cartCount]);

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

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
