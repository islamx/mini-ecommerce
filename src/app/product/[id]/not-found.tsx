import NotFoundPage from "@/components/pages/NotFound";

export default function ProductNotFound() {
  return (
    <NotFoundPage
      icon="package"
      title="Product Not Found"
      description="The product you're looking for doesn't exist or has been removed."
      primaryButtonText="Browse Products"
      footerText="Check out our other products or contact support if you need assistance."
    />
  );
} 