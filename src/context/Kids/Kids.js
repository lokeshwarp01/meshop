import React from 'react';
import './Kids.css';
import AllProducts from '../../components/MyAssets/AllProducts';

const Kids = () => {
  const kidsProducts = AllProducts.filter(product => product.category === 'kids');

  return (
    <div className="kids-container">
      <h2 className="kids-title">Kids Collection</h2>
      <div className="products-grid">
        {kidsProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="product-info">
              <h3>{product.title}</h3>
              <div className="price-container">
                <span className="new-price">₹{product.newPrice}</span>
                {product.oldPrice && (
                  <span className="old-price">₹{product.oldPrice}</span>
                )}
                {product.discount && (
                  <span className="discount">{product.discount}% OFF</span>
                )}
              </div>
              <div className="rating">Rating: {product.rating} ★</div>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kids;