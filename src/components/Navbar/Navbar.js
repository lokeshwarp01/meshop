import React from 'react';
import './Navbar.css';
import carticon from '../MyAssets/cart_icon.png';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = ({ cartCount = 0 }) => {
    const location = useLocation();
    
    const getActiveLink = () => {
        if (location.pathname === '/') return 'home';
        if (location.pathname === '/mens') return 'men';
        if (location.pathname === '/womens') return 'women';
        if (location.pathname === '/kids') return 'Kids';
        return '';
    };

    return (
        <nav className='navbar'>
            <div className='logo'>
                <Link to="/" className='logo-link'><h1>meshop</h1></Link>
            </div>

            <ul className='nav-menu'>
                <li className='nav-item'>
                    <Link
                        to="/"
                        className={getActiveLink() === "home" ? "active" : ""}
                    >
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link
                        to="/mens"
                        className={getActiveLink() === "men" ? "active" : ""}
                    >
                        Men
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link
                        to="/womens"
                        className={getActiveLink() === "women" ? "active" : ""}
                    >
                        Women
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link
                        to="/kids"
                        className={getActiveLink() === "Kids" ? "active" : ""}
                    >
                        Kids
                    </Link>
                </li>
            </ul>

            <div className='nav-actions'>
                <Link to="/login"><button className='login-btn'>Login</button></Link>
                <div className='cart-icon'>
                    <Link to="/cart">
                        <img src={carticon} alt="Cart" />
                        {cartCount > 0 && (
                            <span className='cart-count'>{cartCount}</span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};