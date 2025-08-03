import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

// GET /api/products/[id]
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const product = await Product.findOne({ id: Number(params.id) });
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
