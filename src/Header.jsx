import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Search, User } from "lucide-react";
import "./Header.css";

const Header = () => {
  const [cartItems] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>

            {/* Products + Dropdown */}
            <div
              className={`dropdown ${dropdownOpen ? "show" : ""}`}
              ref={dropdownRef}
            >
              <NavLink to="/products" className="nav-link">
                Products
              </NavLink>
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                ▾
              </button>

              <div className="dropdown-menu">
                {/* ✅ For now visible to all, later restrict to admin */}
                <NavLink to="/add-product" className="dropdown-item">
                  Add Product
                </NavLink>
                <NavLink to="/view-products" className="dropdown-item">
                  View Products
                </NavLink>
              </div>
            </div>

            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
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

            {/* User */}
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


