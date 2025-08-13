import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AllProducts from '../../components/MyAssets/AllProducts';
import './Product.css';

const Product = ({ addToCart }) => {
  const { productId } = useParams();
  const product = AllProducts.find(p => p.id === parseInt(productId));
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  const handleAddToCart = () => {
    if (product.availableSizes && !selectedSize) {
      alert('Please select a size');
      return;
    }
    if (product.availableColors && !selectedColor) {
      alert('Please select a color');
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity
    });
  };

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image-container">
          <img src={product.image} alt={product.title} className="product-main-image" />
        </div>
        <div className="product-details">
          <h1 className="product-title">{product.title}</h1>

          <div className="product-price-container">
            <span className="product-new-price">₹{product.newPrice.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="product-old-price">₹{product.oldPrice.toFixed(2)}</span>
            )}
            {product.discount > 0 && (
              <span className="product-discount">{product.discount}% OFF</span>
            )}
          </div>

          {product.availableSizes && (
            <div className="product-options">
              <h4>Size</h4>
              <div className="size-options">
                {product.availableSizes.map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.availableColors && (
            <div className="product-options">
              <h4>Color</h4>
              <div className="color-options">
                {product.availableColors.map(color => (
                  <div key={color} className="color-option-container">
                    <button
                      className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="quantity-selector">
            <h4>Quantity</h4>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="product-actions">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-now-btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
