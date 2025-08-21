"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    rating: "",
    reviews: "",
    image: "",
    extraInfo: "" // optional field for any product
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...product,
      id: Date.now(),
      price: parseFloat(product.price),
      stock: parseInt(product.stock),
      rating: parseFloat(product.rating),
      reviews: parseInt(product.reviews),
      createdAt: new Date().toISOString(),
    };
    console.log("New Product Added:", newProduct);
    alert("✅ Product added successfully! Check console.");
  };

  return (
    <div className="max-w-3xl mx-auto p-6  shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Basic Fields */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        
        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Electronics, Fashion, Food)"
          value={product.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={product.stock}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating (e.g., 4.5)"
          value={product.rating}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="reviews"
          placeholder="Reviews Count"
          value={product.reviews}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="url"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Optional Extra Info */}
        <textarea
          name="extraInfo"
          placeholder="Additional Info (e.g. size, color, material, specifications, etc.)"
          value={product.extraInfo}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
