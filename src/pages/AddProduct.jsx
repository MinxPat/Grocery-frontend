import React, { useState } from "react";
import "./AddProduct.css"; // Import CSS file

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState(""); // total quantity from supplier
  const [displayQuantity, setDisplayQuantity] = useState(""); // quantity shown to customer
  const [quantityUnit, setQuantityUnit] = useState(""); // radio selection
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0); // int now
  const [imageFile, setImageFile] = useState(null);
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
      case "stockQuantity":
        setStockQuantity("");
        break;
      case "displayQuantity":
        setDisplayQuantity("");
        break;
      case "quantityUnit":
        setQuantityUnit("");
        break;
      case "description":
        setDescription("");
        break;
      case "discount":
        setDiscount(0);
        break;
      case "imageFile":
        setImageFile(null);
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
    setStockQuantity("");
    setDisplayQuantity("");
    setQuantityUnit("");
    setDescription("");
    setDiscount(0);
    setImageFile(null);
    setImagePreview(null);
  };

  // Image handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("proName", productName);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("stockQuantity", stockQuantity);
    formData.append("displayQuantity", displayQuantity);
    formData.append("quantityUnit", quantityUnit);
    formData.append("description", description);
    formData.append("discount", discount);

    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      const response = await fetch("http://localhost:8082/api/products", {
        method: "POST",
        body: formData,
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
              <option value="sea food">Sea Food</option>
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
            <label>Stock Quantity (Supplier) *</label>
            <input
              type="number"
              placeholder="Enter stock quantity"
              value={stockQuantity}
              min="0"
              onChange={(e) => setStockQuantity(e.target.value)}
            />
            <button
              type="button"
              className="clear-btn"
              onClick={() => handleClear("stockQuantity")}
            >
              Clear
            </button>
          </div>

          <div className="form-group">
            <label>Display Quantity (Customer Sees) *</label>
            <input
              type="number"
              placeholder="Enter display quantity"
              value={displayQuantity}
              min="0"
              onChange={(e) => setDisplayQuantity(e.target.value)}
            />
            <div className="quantity-units">
              {["KG", "G", "ML", "L", "PACKETS", "BOTTLES", "CANS"].map((unit) => (
                <label key={unit}>
                  <input
                    type="radio"
                    value={unit}
                    checked={quantityUnit === unit}
                    onChange={(e) => setQuantityUnit(e.target.value)}
                  />
                  {unit}
                </label>
              ))}
            </div>
            <button
              type="button"
              className="clear-btn"
              onClick={() => {
                handleClear("displayQuantity");
                handleClear("quantityUnit");
              }}
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
              placeholder="0"
              value={discount}
              min="0"
              onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
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
            <div className="upload-box">
              <input
                id="product-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <label htmlFor="product-image" className="upload-label">
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
            </div>
            <button
              type="button"
              className="clear-btn"
              onClick={() => handleClear("imageFile")}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
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
      </form>
    </div>
  );
};

export default AddProduct;
