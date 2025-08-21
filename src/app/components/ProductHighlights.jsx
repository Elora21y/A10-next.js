"use client";
import React from 'react';
import ProductCard from './ProductCard';

const ProductHighlights = () => {
    return (
        <div>
            <h2 className='text-xl font-semibold text-info sm:text-2xl md:text-3xl'>Our Recent Products</h2>
            <div className='w-36 rounded-2xl text-info border-t-3 '></div>
            <ProductCard/>
        </div>
    );
};

export default ProductHighlights;