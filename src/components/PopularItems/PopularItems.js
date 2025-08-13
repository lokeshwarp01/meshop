import React from 'react';
import './PopularItems.css';
import AllProducts from '../MyAssets/AllProducts';
import { Link } from 'react-router-dom';

const PopularItems = () => {
  // Get products for each category
  const menProducts = AllProducts
    .filter(product => product.popularWith?.includes('men'))
    .slice(0, 5);

  const womenProducts = AllProducts
    .filter(product => product.popularWith?.includes('women'))
    .slice(0, 5);

  const kidsProducts = AllProducts
    .filter(product => product.popularWith?.includes('kids'))
    .slice(0, 5);

  const discountProducts = [...AllProducts]
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 5);

  const renderProductRow = (products, title, category) => (
    <div className="product-row" key={title}>
      <div className="row-header">
        <h3 className="row-title">{title}</h3>
        <Link to={`/${category}`} className="row-view-all">
          View All →
        </Link>
      </div>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            {product.discount > 0 && (
              <div className="discount-badge">-{product.discount}%</div>
            )}
            <img 
              src={product.image} 
              alt={product.title} 
              className="product-image"
            />
            <div className="product-info">
              <h4 className="product-title">{product.title}</h4>
              <div className="product-price">
                <span className="new-price">₹{product.newPrice.toFixed(2)}</span>
                {product.discount > 0 && (
                  <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                )}
              </div>
              <div className="product-rating">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="popular-items-section">
      <h2 className="section-title">Featured Collections</h2>
      
      {renderProductRow(menProducts, "Popular with Men", "men")}
      {renderProductRow(womenProducts, "Popular with Women", "women")}
      {renderProductRow(kidsProducts, "Popular with Kids", "kids")}
      {renderProductRow(discountProducts, "Hot Deals - High Discount", "discount")}
    </div>
  );
};

export default PopularItems;