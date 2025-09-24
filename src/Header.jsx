import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Search, User, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = () => {
    const [cartItems] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Hardcoded admin flag (later can be replaced with real auth check)
    const isAdmin = true;

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
                        
                        {/* Products with arrow toggle */}
                        <div 
                            className="dropdown" 
                            onMouseEnter={() => setDropdownOpen(true)} 
                            onMouseLeave={() => setDropdownOpen(false)}
                        >
                            <span className="nav-link">Products</span>
                            <ChevronDown 
                                size={18} 
                                className={`dropdown-arrow ${dropdownOpen ? "open" : ""}`} 
                            />

                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    {isAdmin && (
                                        <Link to="/add-product" className="dropdown-item">Add Product</Link>
                                    )}
                                    <Link to="/view-products" className="dropdown-item">View Products</Link>
                                    <Link to="/offers" className="dropdown-item">Special Offers</Link>
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




