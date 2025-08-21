"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loading from "../loading";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="font-semibold text-info  text-2xl md:text-3xl lg:text-4xl">
        Available Products
      </h2>
      <div className="w-36 rounded-2xl text-info border-t-3 "></div>
      <ProductCard products={products} />
    </div>
  );
};

export default ProductsPage;
