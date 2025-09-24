import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0.0);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);

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

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleClear = () => {
    setProductName("");
    setCategory("");
    setDescription("");
    setDiscount(0.0);
    setPrice("");
    setQuantity("");
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      productName,
      category,
      description,
      discount: discount || 0.0,
      price,
      quantity,
      imagePath: image,
    };

    console.log("Product Added:", newProduct);
    alert("Product Added Successfully ✅");
    handleClear();
  };

  return (
    <div className="add-product-page">
      <h2 className="page-title">➕ Add New Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        {/* Product Name */}
        <label>
          Product Name <span className="required">*</span>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>

        {/* Category */}
        <label>
          Category <span className="required">*</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        {/* Description */}
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        {/* Price */}
        <label>
          Price ($) <span className="required">*</span>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        {/* Quantity */}
        <label>
          Quantity <span className="required">*</span>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>

        {/* Discount */}
        <label>
          Discount (%)
          <input
            type="number"
            step="0.01"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </label>

        {/* Image Upload */}
        <label>
          Upload Image
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
        {image && <img src={image} alt="Preview" className="preview-img" />}

        {/* Buttons */}
        <div className="button-group">
          <button type="submit" className="btn add-btn">
            ✅ Add Product
          </button>
          <button type="button" onClick={handleClear} className="btn clear-btn">
            ❌ Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
