import { Suspense } from "react";
import HomePageContent from "@/components/pages/Home";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomePageContent />
    </Suspense>
  );
}
