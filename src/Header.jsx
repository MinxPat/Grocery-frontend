import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Search, User } from 'lucide-react';
import './Header.css';

const Header = ({ isAdmin = false }) => {
    const [cartItems] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    {/* Logo */}
                    <Link to="/" className="logo">
                        <div className="logo-icon">
                            <img src="/images/vegetable.png" alt="Grocery store logo" />
                        </div>
                        <span className="logo-text">Ravindra</span>
                        <span className="ltext-green">Stores</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="nav">
                        <NavLink to="/" className="nav-link">Home</NavLink>

                        {/* Products with Dropdown */}
                        <div
                            className="nav-link dropdown"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <span>
                                Products <span style={{ fontSize: '12px' }}>▼</span>
                            </span>
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    <NavLink to="/products" className="dropdown-item">
                                        View Products
                                    </NavLink>
                                    {isAdmin && (
                                        <NavLink to="/add-product" className="dropdown-item">
                                            Add Product
                                        </NavLink>
                                    )}
                                </div>
                            )}
                        </div>

                        <NavLink to="/contact" className="nav-link">Contact</NavLink>
                    </nav>

                    {/* Right side */}
                    <div className="header-right">
                        {/* Search */}
                        <div className="search-box">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="search-input"
                            />
                        </div>

                        {/* User Profile */}
                        <Link to="/login" className="icon-btn">
                            <User size={20} />
                        </Link>

                        {/* Cart */}
                        <Link to="/cart" className="cart-btn">
                            <ShoppingCart size={18} />
                            <span className="cart-text">Cart</span>
                            {cartItems > 0 && (
                                <span className="cart-badge">{cartItems}</span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
