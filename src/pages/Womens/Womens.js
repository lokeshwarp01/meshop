import React from 'react';
import { Link } from 'react-router-dom';
import './Womens.css';
import AllProducts from '../../components/MyAssets/AllProducts';

const Women = () => {
  const womenProducts = AllProducts.filter(product => product.category === 'women');

  return (
    <div className="women-container">
      <h2 className="women-title">Women's Collection</h2>
      <div className="products-grid">
        {womenProducts.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card-link">
            <div className="product-card">
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
                <button className="view">view</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Women;