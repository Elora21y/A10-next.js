"use client";
import React from "react";
// import banner from '/shopping.jpg'
import Image from "next/image";

const Hero = () => {
  return (
    <div>
      <div
        className="hero min-h-[80vh] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(/shopping.jpg)`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-5 max-w-3xl text-left px-6 lg:px-12">
          <h1 className="mb-5 text-4xl md:text-5xl font-bold text-white leading-tight">
            Discover the Future of Online Shopping
          </h1>
          <p className="mb-6 text-lg text-gray-200">
            Explore thousands of products, enjoy exclusive deals, 
            and experience a seamless shopping journey — all in one place.
          </p>
          <button className="btn btn-info rounded-3xl">Start Shopping</button>
        </div>
      </div>
    </div>
  );
};


export default Hero;
