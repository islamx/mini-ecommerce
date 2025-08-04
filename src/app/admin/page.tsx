import { Suspense } from "react";
import AdminPageContent from "@/components/admin/AdminPageContent";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function AdminPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminPageContent />
    </Suspense>
  );
}
