import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

// GET /api/products/:id
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await context.params;
    const product = await Product.findOne({ id: Number(id) });

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// PUT /api/products/:id
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await context.params;
    const body = await req.json();

    const updated = await Product.findOneAndUpdate(
      { id: Number(id) },
      body,
      { new: true } // ← يرجع البيانات بعد التعديل
    );

    if (!updated) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("❌ PUT error:", error);
    return NextResponse.json({ message: "Failed to update product" }, { status: 500 });
  }
}

// DELETE /api/products/:id
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await context.params;

    const deleted = await Product.findOneAndDelete({ id: Number(id) });

    if (!deleted) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    console.error("❌ DELETE error:", error);
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
  }
}
