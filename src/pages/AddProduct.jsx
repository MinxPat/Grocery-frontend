import React, { useState } from "react";
import "./AddProduct.css"; // Import CSS file

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityUnit, setQuantityUnit] = useState(""); 
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0.0);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Clear one field
  const handleClear = (field) => {
    switch (field) {
      case "productName":
        setProductName("");
        break;
      case "category":
        setCategory("");
        break;
      case "price":
        setPrice("");
        break;
      case "quantity":
        setQuantity("");
        setQuantityUnit(""); // reset unit
        break;
      case "description":
        setDescription("");
        break;
      case "discount":
        setDiscount(0.0);
        break;
      case "image":
        setImage(null);
        setImagePreview(null);
        break;
      default:
        break;
    }
  };

  // Clear all fields
  const handleClearAll = () => {
    setProductName("");
    setCategory("");
    setPrice("");
    setQuantity("");
    setQuantityUnit("");
    setDescription("");
    setDiscount(0.0);
    setImage(null);
    setImagePreview(null);
  };

  // Image upload handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      proName: productName,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      quantityUnit, 
      description,
      discount: parseFloat(discount),
      imagePath: image ? image.name : ""
    };

    try {
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert("❌ Failed to add product: " + errorText);
        return;
      }

      const savedProduct = await response.json();
      console.log("Product added:", savedProduct);
      alert("✅ Product added successfully!");
      handleClearAll();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("⚠️ Server error. Check backend logs.");
    }
  };

  return (
    <div className="add-product-container">
      <h2 className="form-title">
        <span className="form-title-icon">+</span> Add New Product
      </h2>

      <form className="form-grid" onSubmit={handleSubmit}>
        {/* Left column */}
        <div className="form-column">
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <button
              type="button"
              className="clear-btn"
              onClick={() => handleClear("productName")}
            >
              Clear
            </button>
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">-- Select Category --</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="beverages">Beverages</option>
              <option value="canned food">Canned Food</option>
              <option value="dairy">Dairy</option>
              <option value="meat">Meat</option>
              <option value="snacks">Snacks</option>
            </select>
            <button
              type="button"
              className="clear-btn"
              onClick={() => handleClear("category")}
            >
              Clear
            </button>
          </div>

          <div className="form-group">
            <label>Price (Rs.) *</label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              min="0"
              onChange={(e) => setPrice(e.target.value)}
            />
            <button
              type="button"
              className="clear-btn"
              onClick={() => handleClear("price")}
            >
              Clear
            </button>
          </div>

          <div className="form-group">
            <label>Quantity *</label>
            <input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              min="0"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <div className="quantity-units">
              <label>
                <input
                  type="radio"
                  value="kg"
                  checked={quantityUnit === "kg"}
                  onChange={(e) => setQuantityUnit(e.target.value)}
                />
                kg
              </label>
              <label>
                <input
                  type="radio"
                  value="g"
                  checked={quantityUnit === "g"}
                  onChange={(e) => setQuantityUnit(e.target.value)}
                />
                g
              </label>
              <label>
                <input
                  type="radio"
                  value="ml"
                  checked={quantityUnit === "ml"}
                  onChange={(e) => setQuantityUnit(e.target.value)}
                />
                ml
              </label>
              <label>
                <input
                  type="radio"
                  value="l"
                  checked={quantityUnit === "l"}
                  onChange={(e) => setQuantityUnit(e.target.value)}
                />
                l
              </label>
            </div>
            <button
              type="button"
              className="clear-btn"
              onClick={() => handleClear("quantity")}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Right column */}
        <div className="form-column right">
          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button
              type="button"
              className="clear-btn"
              onClick={() => handleClear("description")}
            >
              Clear
            </button>
          </div>

          <div className="form-group">
            <label>Discount (%)</label>
            <input
              type="number"
              placeholder="0.0"
              value={discount}
              min="0"
              step="0.1"
              onChange={(e) => setDiscount(parseFloat(e.target.value) || 0.0)}
            />
            <button
              type="button"
              className="clear-btn"
              onClick={() => handleClear("discount")}
            >
              Clear
            </button>
          </div>

          <div className="form-group image-upload">
            <label>Upload Image</label>
            <label className="upload-box">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="image-preview"
                />
              ) : (
                <span className="upload-icon">📷</span>
              )}
            </label>
            <button
              type="button"
              className="clear-btn"
              onClick={() => handleClear("image")}
            >
              Clear
            </button>
          </div>
        </div>
      </form>

      {/* Action buttons */}
      <div className="form-actions">
        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          Add Product
        </button>
        <button
          type="button"
          className="clear-all-btn"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
