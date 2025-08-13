import React from 'react';
import { useParams } from 'react-router-dom';
import AllProducts from '../../components/MyAssets/AllProducts';
import './Product.css';

const Product = () => {
  const { productId } = useParams();
  const product = AllProducts.find(p => p.id === parseInt(productId));

  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image-container">
          <img src={product.image} alt={product.title} className="product-main-image" />
        </div>
        <div className="product-details">
          <h1 className="product-title">{product.title}</h1>
          <div className="product-rating">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
            <span className="rating-count">({product.ratingCount || 100} reviews)</span>
          </div>
          <div className="product-price-container">
            <span className="product-new-price">₹{product.newPrice.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="product-old-price">₹{product.oldPrice.toFixed(2)}</span>
            )}
            {product.discount > 0 && (
              <span className="product-discount">{product.discount}% OFF</span>
            )}
          </div>
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description || 'No description available for this product.'}</p>
          </div>
          <div className="product-actions">
            <button className="add-to-cart-btn">Add to Cart</button>
            <button className="buy-now-btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;