"use client";
import React from 'react';
import { products } from '../lib/products';
import Link from 'next/link';

const ProductCard = () => {
    return (
    <div className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <figure className="px-4 pt-4">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-xl object-cover h-48 w-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p className="text-gray-600 line-clamp-2">
                {product.description}
              </p>
              <p className="text-lg font-semibold text-info">
                ${product.price}
              </p>
              <div className="card-actions justify-end">
                <Link href={`/products/${product._id}`} className="btn btn-info btn-soft btn-wide rounded-2xl">
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;