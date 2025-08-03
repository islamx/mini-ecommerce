import { dbConnect } from "@/lib/dbConnect";

type Props = {
  params: { id: string };
};

async function ProductDetailsPage({ params }: Props) {
  try {
    await dbConnect();
    console.log("✅ MongoDB Connected from UI page");
  } catch (error) {
    console.error("❌ Connection Error:", error);
  }

  return (
    <div>
      <h1>Product Details Page</h1>
    </div>
  );
}

export default ProductDetailsPage;
