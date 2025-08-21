
import dbConnect from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { FaStar, FaBox, FaCheckCircle } from "react-icons/fa";

const ProductDetails = async({params}) => {
  const {id}= params
 const productCollection = dbConnect("products");
  const product = await productCollection.findOne({_id : new ObjectId(id)})
// // console.log(id)

  if (!product) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-base-200">
      <div className="card p-6 shadow-2xl flex flex-col  md:flex-row justify-between md:items-center gap-6">
        <figure className="max-w-96">
          <Image src={product.image} alt={product.name} className="rounded-xl object-cover object-center" width={400} height={400}/>
        </figure>

        <div className="card-body">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center gap-2 mt-2 text-yellow-500">
            <FaStar /> <span>4.8 (142 reviews)</span>
          </div>

          <p className="text-lg font-semibold mt-4">${product.price}</p>

          <div className="flex items-center gap-2 mt-2">
            <FaBox /> <span>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</span>
          </div>

         {
            product.brand && 
             <div className="flex items-center gap-2 mt-2 text-green-600">
            <FaCheckCircle /> <span>Brand: {product.brand}</span>
          </div>
         }

          <div className="card-actions mt-6">
            <button className="btn btn-info btn-soft rounded-2xl">Add to Cart</button>
            <button className="btn btn-outline rounded-2xl">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
