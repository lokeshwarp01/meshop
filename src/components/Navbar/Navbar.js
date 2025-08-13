import React from 'react';
import './Navbar.css';
import carticon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Navbar = () => {
    const [activeLink, setActiveLink] = useState("home");
    return (
        <nav className='navbar'>
            <div className='logo'>
                <Link to="/" className='logo-link'><h1>meshop</h1></Link>
            </div>

            <ul className='nav-menu'>
                <li className='nav-item'>
                    <Link
                        to="/"
                        className={activeLink === "home" ? "active" : ""}
                        onClick={() => setActiveLink("home")}>
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link
                        to="/men"
                        className={activeLink === "men" ? "active" : ""}
                        onClick={() => setActiveLink("men")}
                    >
                        Men
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link
                        to="/women"
                        className={activeLink === "women" ? "active" : ""}
                        onClick={() => setActiveLink("women")}
                    >
                        Women
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link
                        to="/kids"
                        className={activeLink === "Kids" ? "active" : ""}
                        onClick={() => setActiveLink("Kids")}
                    >
                        Kids
                    </Link>
                </li>
            </ul>

            <div className='nav-actions'>
                <Link to="/login"><button className='login-btn'>Login</button></Link>
                <div className='cart-icon'>
                    <Link to="/Cart"><img src={carticon} alt="Cart" />
                        <span className='cart-count'>0</span></Link>
                </div>
            </div>
        </nav>
    );
}