import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {

    const exist = cart.find(item => item.id === product.id);

    if (exist) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const increaseQty = (id) => {
    setCart(
      cart.map(item =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart.map(item =>
        item.id === id
          ? { ...item, qty: item.qty - 1 }
          : item
      ).filter(item => item.qty > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        increaseQty,
        decreaseQty
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;