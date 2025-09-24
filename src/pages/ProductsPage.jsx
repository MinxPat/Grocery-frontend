import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import ProductCard from "../ProductCard"; // you already have this

// Sample data (replace with API or props later)
const products = [
  {
    id: 1,
    name: "Potato Chips",
    category: "Snacks",
    weight: "500g",
    price: 600,
    oldPrice: 1000,
    discount: "40%",
    image: "https://via.placeholder.com/150", // replace with real image later
  },
  {
    id: 2,
    name: "Cookies",
    category: "Snacks",
    weight: "500g",
    price: 600,
    oldPrice: 1000,
    discount: "40%",
    image: "https://via.placeholder.com/150",
  },
  // add more products here...
];

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Our Products</h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
