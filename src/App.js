import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import the layout
import MainLayout from './MainLayout';

// Import your pages
import GroceryStore from './GroceryStore';
import Login from './Login';
import Register from './Register';
// Create a placeholder for Products, Contact, and Cart if not implemented yet
const Products = () => <div>Products Page</div>;
const Contact = () => <div>Contact Page</div>;
const Cart = () => <div>Cart Page</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* All routes inside here will have the header and footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<GroceryStore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

