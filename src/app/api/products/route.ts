import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

// GET /api/products
export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();

    return NextResponse.json({
      data: products,
      pagination: {
        page,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

// POST /api/products
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const newProduct = await Product.create(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create product" }, { status: 400 });
  }
}
