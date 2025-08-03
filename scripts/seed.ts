import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/models/Product";

const dummyProducts = [
  {
    title: "iPhone 15 Pro",
    description: "Apple flagship phone with A17 Pro chip.",
    price: 42000,
    category: "Mobiles",
    imageUrl: "https://picsum.photos/seed/iphone15/300/200",
  },
  {
    title: "MacBook Air M3",
    description: "Apple Silicon M3 13-inch laptop.",
    price: 58000,
    category: "Laptops",
    imageUrl: "https://picsum.photos/seed/macbookair/300/200",
  },
  {
    title: "Sony WH-1000XM5",
    description: "Noise-cancelling wireless headphones.",
    price: 12000,
    category: "Audio",
    imageUrl: "https://picsum.photos/seed/sonyheadphones/300/200",
  },
];

async function seed() {
  try {
    await dbConnect();
    await Product.deleteMany();
    await Product.insertMany(dummyProducts);
    console.log("✅ Seeding done successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}

seed();
