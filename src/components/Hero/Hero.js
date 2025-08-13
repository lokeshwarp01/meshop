import React from 'react';
import './Hero.css';
import heroImage from '../Assets/Fashion.png'; 
import arrowIcon from '../Assets/arrow.png';

export const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-subtitle">Exclusive Offers</p>
          <h1 className="hero-title">Premium Quality For Everyone</h1>
          <p className="hero-description">
            Discover our curated collection of high-quality products at prices that work for you.
            Quality you can trust, service you can count on.
          </p>
          <div className="hero-cta">
            <button className="shop-now-btn">
              Shop Now <img src={arrowIcon} alt="arrow" />
            </button>
            <button className="category-btn">Browse Categories</button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">200+</span>
              <span className="stat-label">Brands</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2,000+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">30,000+</span>
              <span className="stat-label">Customers</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Happy shopper with products" />
        </div>
      </div>
    </section>
  );
};
export default Hero;