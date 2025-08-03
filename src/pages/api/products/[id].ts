import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
      } catch (error) {
        return res.status(500).json({ message: "Server error" });
      }

    case "PUT":
      try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(updatedProduct);
      } catch (error) {
        return res.status(400).json({ message: "Failed to update product" });
      }

    case "DELETE":
      try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
          return res.status(404).json({ message: "Product not found" });
        }
        return res.status(204).end(); // No Content
      } catch (error) {
        return res.status(500).json({ message: "Server error" });
      }

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
