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
    if ((product.sizes && product.sizes.length > 0) && !selectedSize) {
      alert('Please select a size');
      return;
    }
    if ((product.colors && product.colors.length > 0) && !selectedColor) {
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
          {product.tags && product.tags.includes('best seller') && (
            <span className="product-badge">Best Seller</span>
          )}
          {product.discount > 0 && (
            <span className="discount-badge">{product.discount}% OFF</span>
          )}
        </div>
        <div className="product-details">
          <h1 className="product-title">{product.title}</h1>
          <div className="product-rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>
                {i < product.rating ? '★' : '☆'}
              </span>
            ))}
            <span className="rating-count">({product.rating})</span>
          </div>

          <div className="product-price-container">
            <span className="product-new-price">₹{product.newPrice.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="product-old-price">₹{product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          <div className="product-description">
            <p>{product.description}</p>
          </div>

          {product.sizes && product.sizes.length > 0 && (
            <div className="product-option">
              <h4>Size</h4>
              <div className="size-options">
                {product.sizes.map(size => (
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

          {product.colors && product.colors.length > 0 && (
            <div className="product-option">
              <h4>Color</h4>
              <div className="color-options">
                {product.colors.map(color => (
                  <div key={color} className="color-option-container">
                    <button
                      className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    />
                    <span className="color-name">{color}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="product-option">
            <h4>Quantity</h4>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
          </div>

          <div className="product-stock">
            {product.stock > 5 ? (
              <span className="in-stock">In Stock ({product.stock} available)</span>
            ) : product.stock > 0 ? (
              <span className="low-stock">Only {product.stock} left!</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="product-actions">
            <button 
              className="add-to-cart-btn" 
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              Add to Cart
            </button>
            <button 
              className="buy-now-btn"
              disabled={product.stock <= 0}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;