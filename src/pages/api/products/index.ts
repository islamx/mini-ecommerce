import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const products = await Product.find();
      return res.status(200).json(products);
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
