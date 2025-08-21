"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import image from "../../../../public";
import axios from "axios";

export default function AddProductPage() {
  const [profileLoading, setProfileLoading] = useState(false);
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
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn()
    }
  }, [status, router]);
  const handleImgUpload = async (e) => {
    const img = e.target.files[0];
    console.log(e.target.files);
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
      // toast.error("Failed to upload image, try sometime later");
    } finally {
      setProfileLoading(false);
    }
  };

  if (status === "loading") {
    return <p className="p-6">Loading...</p>;
  }

  if (!session) {
    return null;
  }

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
      price: parseFloat(product.price),
      stock: parseInt(product.stock),
      image: profilePic,
      createdAt: new Date().toISOString(),
    };
    console.log("New Product Added:", newProduct);
    alert("Product added successfully! Check console.");
  };

  return (
    <div className="max-w-5xl mx-auto p-6  shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col md:flex-row gap-5 md:gap-10"
      >
        {/* Basic Fields */}
        <div className="space-y-4">
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
        </div>
        <div className="space-y-4">
          {/* description */}
          <textarea
            name="description"
            placeholder="Product Description"
            value={product.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          {/* //image */}
          <label className="label" onChange={handleImgUpload}>
            <div className="flex text-center items-center justify-center py-2 mx-auto border  border-[#9ca3af8f] border-dashed rounded-lg min-h-14 px-20">
              {profileLoading ? (
                <span className="loading loading-spinner text-info"></span>
              ) : (
                <img
                  src={profilePic ? profilePic : '/upload-img.png'}
                  className={`w-30  h-26 object-cover`}
                />
              )}
            </div>
            <input type="file" className="hidden" />
          </label>
          <br />
          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
