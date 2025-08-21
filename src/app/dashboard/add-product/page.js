"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/app/loading";
import Image from "next/image";

export default function AddProductPage() {
  const [profileLoading, setProfileLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false); // <-- new state
  const [profilePic, setProfilePic] = useState("");
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
  });

  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") signIn();
  }, [status]);

  // Handle Image Upload
  const handleImgUpload = async (e) => {
    const img = e.target.files[0];
    if (!img) return;

    const formData = new FormData();
    formData.append("image", img);

    const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;
    setProfileLoading(true);

    try {
      const res = await axios.post(imgUploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Failed to upload image, try again later");
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle Form Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profilePic) {
      toast.error("Please upload a product image");
      return;
    }

    const newProduct = {
      ...product,
      price: parseFloat(product.price),
      stock: parseInt(product.stock),
      image: profilePic,
      createdAt: new Date().toISOString(),
    };

    try {
      setSubmitting(true); // <-- start spinner
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error("Failed to add product");

      const data = await res.json();
      console.log("Product Added:", data);

      toast.success("Product added successfully!");

      // Reset form
      setProduct({ name: "", description: "", price: "", category: "", brand: "", stock: "" });
      setProfilePic("");
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error("Error adding product!");
    } finally {
      setSubmitting(false); // <-- stop spinner
    }
  };

  if (status === "loading") return <Loading />;
  if (!session) return null;

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-info">Add New Product</h1>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Left Section: Inputs */}
        <div className="flex-1 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
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
            placeholder="Category (e.g. Electronics, Fashion)"
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
        </div>

        {/* Right Section: Description + Image + Submit */}
        <div className="flex-1 space-y-2">
          <textarea
            name="description"
            placeholder="Product Description"
            value={product.description}
            onChange={handleChange}
            className="w-full border p-2 rounded min-h-28"
            required
          />

          <label className="w-full cursor-pointer">
            <div className="flex items-center justify-center py-1 border border-dashed rounded-lg ">
              {profileLoading ? (
                <span className="loading loading-spinner text-info"></span>
              ) : (
                <Image
                  src={profilePic || "/upload-img.png"}
                  alt="Product"
                  className="w-20 object-cover rounded-lg"
                  width={200}
                  height={10}
                />
              )}
            </div>
            <input type="file" className="hidden" onChange={handleImgUpload} />
          </label>

          <button
            type="submit"
            className="btn btn-info w-full text-white font-semibold mt-2 rounded-2xl hover:btn-active flex items-center justify-center gap-2"
            disabled={submitting}
          >
            {submitting && <span className="loading loading-spinner"></span>}
            {submitting ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
