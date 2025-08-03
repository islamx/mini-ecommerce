import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/models/Product";

// GET /api/products
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find().sort({ createdAt: -1 }); // أحدث الأول
    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}
