import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 8;
      const skip = (page - 1) * limit;

      const products = await Product.find().skip(skip).limit(limit);
      const total = await Product.countDocuments();

      return res.status(200).json({
        data: products,
        pagination: {
          page,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  }

  if (req.method === "POST") {
    try {
      const newProduct = await Product.create(req.body);
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(400).json({ message: "Failed to create product" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
