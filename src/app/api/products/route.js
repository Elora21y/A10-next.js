import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";

export async function GET() {
  const productCollection = dbConnect("products");
  const products = await productCollection.find().sort({ createdAt: -1 }).toArray();
  return NextResponse.json(products);
}
