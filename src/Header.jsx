import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Search, User, ChevronDown, ChevronUp } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [cartItems] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isAdmin = true; // later replace with real auth

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

            {/* Dropdown */}
            <div className="dropdown">
              <button 
                className="dropdown-btn" 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Products {isDropdownOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
              </button>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/products" className="dropdown-item">View Products</Link>
                  {isAdmin && <Link to="/add-product" className="dropdown-item">Add Product</Link>}
                </div>
              )}
            </div>

            <NavLink to="/contact" className="nav-link">Contact</NavLink>
          </nav>

          {/* Right side */}
          <div className="header-right">
            <div className="search-box">
              <Search size={18} className="search-icon"/>
              <input type="text" placeholder="Search products..." className="search-input"/>
            </div>

            <Link to="/login" className="icon-btn">
              <User size={20}/>
            </Link>

            <Link to="/cart" className="cart-btn">
              <ShoppingCart size={18}/>
              <span className="cart-text">Cart</span>
              {cartItems > 0 && <span className="cart-badge">{cartItems}</span>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

