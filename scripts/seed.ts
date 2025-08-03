import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/models/Product";

const dummyProducts = [
  {
    title: "iPhone 15 Pro",
    description: "Apple's flagship smartphone with the powerful A17 Pro chip and titanium body.",
    price: 42000,
    category: "Mobiles",
    imageUrl: "https://picsum.photos/seed/iphone15/300/200",
  },
  {
    title: "MacBook Air M3",
    description: "Apple Silicon M3 laptop with exceptional performance and battery life.",
    price: 58000,
    category: "Laptops",
    imageUrl: "https://picsum.photos/seed/macbookair/300/200",
  },
  {
    title: "Sony WH-1000XM5",
    description: "Industry-leading noise-canceling headphones with incredible sound quality.",
    price: 12000,
    category: "Audio",
    imageUrl: "https://picsum.photos/seed/sonyheadphones/300/200",
  },
  {
    title: "Dell XPS 13",
    description: "Compact and powerful ultrabook with edge-to-edge display.",
    price: 44000,
    category: "Laptops",
    imageUrl: "https://picsum.photos/seed/dellxps/300/200",
  },
  {
    title: "Samsung Galaxy S24",
    description: "High-end Android phone with Dynamic AMOLED display.",
    price: 39000,
    category: "Mobiles",
    imageUrl: "https://picsum.photos/seed/galaxys24/300/200",
  },
  {
    title: "AirPods Pro 2",
    description: "Apple’s wireless earbuds with active noise cancellation and transparency mode.",
    price: 8500,
    category: "Audio",
    imageUrl: "https://picsum.photos/seed/airpodspro/300/200",
  },
  {
    title: "Apple Watch Series 9",
    description: "Smartwatch with health tracking and fitness monitoring.",
    price: 17000,
    category: "Wearables",
    imageUrl: "https://picsum.photos/seed/applewatch/300/200",
  },
  {
    title: "iPad Pro M2",
    description: "Powerful tablet with Liquid Retina XDR display and Apple Pencil support.",
    price: 33000,
    category: "Tablets",
    imageUrl: "https://picsum.photos/seed/ipadpro/300/200",
  },
  {
    title: "Logitech MX Master 3S",
    description: "Advanced wireless mouse with ergonomic design.",
    price: 3000,
    category: "Accessories",
    imageUrl: "https://picsum.photos/seed/mxmaster3/300/200",
  },
  {
    title: "Kindle Paperwhite",
    description: "E-reader with adjustable warm light and long battery life.",
    price: 4500,
    category: "Gadgets",
    imageUrl: "https://picsum.photos/seed/kindle/300/200",
  },
  {
    title: "Sony PlayStation 5",
    description: "Next-gen gaming console with ultra-fast SSD and DualSense controller.",
    price: 28000,
    category: "Gaming",
    imageUrl: "https://picsum.photos/seed/ps5/300/200",
  },
  {
    title: "Xbox Series X",
    description: "Powerful gaming console from Microsoft with 4K gaming support.",
    price: 27000,
    category: "Gaming",
    imageUrl: "https://picsum.photos/seed/xboxx/300/200",
  },
  {
    title: "DJI Mini 3 Pro",
    description: "Compact drone with 4K HDR video and advanced obstacle sensing.",
    price: 35000,
    category: "Drones",
    imageUrl: "https://picsum.photos/seed/dji/300/200",
  },
  {
    title: "Anker PowerCore 20000",
    description: "High-capacity power bank with fast charging support.",
    price: 1200,
    category: "Accessories",
    imageUrl: "https://picsum.photos/seed/anker/300/200",
  },
  {
    title: "Google Pixel 8",
    description: "Google's latest smartphone with Tensor chip and stock Android experience.",
    price: 37000,
    category: "Mobiles",
    imageUrl: "https://picsum.photos/seed/pixel8/300/200",
  },
];

async function seed() {
  try {
    await dbConnect();
    await Product.deleteMany();
    await Product.insertMany(dummyProducts.map((p) => ({ ...p, createdAt: new Date() })));
    console.log("✅ Seeding done successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}

seed();
