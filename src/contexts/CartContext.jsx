import { createContext, useState } from 'react';


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      return setCart(updatedCart);
    }

    return setCart([...cart, { ...product, quantity: 1 }]);
  }

  const removeFromCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingProductIndex].quantity -= 1;

        if (updatedCart[existingProductIndex].quantity === 0) {
            updatedCart.splice(existingProductIndex, 1);
        }

        return setCart(updatedCart);
    }
  };


  const clearCart = () => {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
