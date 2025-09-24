import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    discount: 0,
    image: null,
  });

  const categories = [
    "Vegetables",
    "Fruits",
    "Beverages",
    "Canned Food",
    "Dairy",
    "Meat",
    "Sea Food",
    "Snacks",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setProduct({ ...product, image: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Added:", product);
  };

  const handleClear = () => {
    setProduct({
      name: "",
      category: "",
      description: "",
      price: "",
      quantity: "",
      discount: 0,
      image: null,
    });
  };

  return (
    <div className="add-product-container">
      <h2 className="form-title">➕ Add New Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        {/* Left Section */}
        <div className="form-left">
          <div className="form-group">
            <label>Product Name <span className="required">*</span></label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category <span className="required">*</span></label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Price (Rs.) <span className="required">*</span></label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Quantity <span className="required">*</span></label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="form-right">
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="4"
              value={product.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={product.discount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <div className="image-upload-box">
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
              <label htmlFor="imageUpload" className="upload-placeholder">
                {product.image ? (
                  <img src={product.image} alt="Preview" className="preview-img" />
                ) : (
                  <span className="plus-sign">+</span>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Add Product</button>
          <button type="button" className="btn btn-secondary" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

