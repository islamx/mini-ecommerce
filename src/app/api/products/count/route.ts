import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/models/Product";

export async function GET() {
  try {
    await dbConnect();
    
    const total = await Product.countDocuments();
    
    return NextResponse.json({ total });
  } catch (error) {
    console.error("Failed to get product count:", error);
    return NextResponse.json(
      { error: "Failed to get product count" },
      { status: 500 }
    );
  }
} 