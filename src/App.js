import React from 'react';
// Import routing components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import GroceryStore from './GroceryStore'; // Assuming it's in src/
import Login from './Login';
import Register from './Register';

// Import your main stylesheet
import './GroceryStore.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GroceryStore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
