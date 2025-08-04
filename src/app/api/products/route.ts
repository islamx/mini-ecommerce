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

    // Get filter parameters
    const name = searchParams.get("name");
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    // Build filter object
    const filter: any = {};
    
    if (name) {
      filter.title = { $regex: name, $options: "i" };
    }
    
    if (category) {
      filter.category = category;
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    const products = await Product.find(filter).sort({ id: 1 }).skip(skip).limit(limit);
    const total = await Product.countDocuments(filter);

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
    const { title, description, price, category, imageUrl } = body;

    // Simple validation
    if (!title || !description || !price || !imageUrl) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Auto-generate ID: last product ID + 1
    const lastProduct = await Product.findOne().sort({ id: -1 }).limit(1);
    const nextId = lastProduct ? lastProduct.id + 1 : 1;

    const newProduct = await Product.create({
      id: nextId,
      title,
      description,
      price,
      category,
      imageUrl,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("❌ Failed to create product:", error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}
