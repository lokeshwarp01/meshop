import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.newPrice || item.price || 0;
      return total + (price * (item.quantity || 1));
    }, 0);
  };

  const getItemPrice = (item) => {
    return (item.newPrice || item.price || 0).toFixed(2);
  };

  const getItemTotal = (item) => {
    const price = item.newPrice || item.price || 0;
    const quantity = item.quantity || 1;
    return (price * quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/meshop/" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="item-details">
                  <h3 className="item-title">{item.title}</h3>
                  {item.selectedSize && (
                    <p className="item-option"><strong>Size:</strong> {item.selectedSize}</p>
                  )}
                  {item.selectedColor && (
                    <p className="item-option">
                      <strong>Color:</strong> 
                      <span className="color-dot" style={{ backgroundColor: item.selectedColor }}></span> {item.selectedColor}
                    </p>
                  )}
                  <p className="item-price">₹{getItemPrice(item)}</p>
                </div>

                <div className="item-quantity">
                  <button 
                    onClick={() => updateQuantity(item, (item.quantity || 1) - 1)}
                    disabled={(item.quantity || 1) <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => updateQuantity(item, (item.quantity || 1) + 1)}>+</button>
                </div>

                <div className="item-total">₹{getItemTotal(item)}</div>

                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(item)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({cartItems.reduce((total, item) => total + (item.quantity || 1), 0)} items)</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
            <Link to="/meshop/" className="continue-shopping-link">Continue Shopping</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
