import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <Link to="/" className="logo-link">
            <h2>meshop</h2>
          </Link>
          <p>Quality products for everyone</p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h3>Shop</h3>
            <ul>
              <li><Link to="/men">Men</Link></li>
              <li><Link to="/women">Women</Link></li>
              <li><Link to="/kids">Kids</Link></li>
              <li><Link to="/new-arrivals">New Arrivals</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Help</h3>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping</Link></li>
              <li><Link to="/returns">Returns</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} meshop. All rights reserved.</p>
      </div>
    </footer>
  );
};