import { useContext } from 'react';
import './Cart.css';
import { CartContext } from '../contexts/CartContext';

export default function Cart() {
  const { cart, clearCart, addToCart, removeFromCart } = useContext(CartContext);

  // Calcular la cantidad total de productos en el carrito
  const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <>
      <label className='cart-button' htmlFor='cart'>
        🛒 
        {totalQuantity > 0 && <span className='cart-quantity'>{totalQuantity}</span>}
      </label>
      <input id='cart' type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.description} />

              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>

              <footer>
                <small>Quantity: {product.quantity}</small>
                <button onClick={() => removeFromCart(product)}>-</button>
                <button onClick={() => addToCart(product)}>+</button>
              </footer>
            </li>
          ))}
        </ul>

        <button onClick={clearCart}>Clear cart</button>
      </aside>
    </>
  );
}