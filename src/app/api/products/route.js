import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";

const productCollection = dbConnect('products')

export async function GET() {
  const products = await productCollection.find().sort({ createdAt: -1 }).toArray();
  return NextResponse.json(products);
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body) {
      return NextResponse.json({ message: "No data provided" }, { status: 400 });
    }

    const result = await productCollection.insertOne(body);

    return NextResponse.json({ message: "Product added", data: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error adding product" }, { status: 500 });
  }
}