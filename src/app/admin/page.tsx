import { Suspense } from "react";
import AdminPageContent from "@/components/admin/AdminPageContent";

export default function AdminPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminPageContent />
    </Suspense>
  );
}
