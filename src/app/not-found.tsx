"use client";

import NotFoundPage from "@/components/pages/NotFound";

export default function NotFound() {
  return (
    <NotFoundPage
      icon="404"
      title="Page Not Found"
      description="The page you're looking for doesn't exist or has been moved."
      primaryButtonText="Go to Home"
      footerText="If you believe this is an error, please contact support."
    />
  );
} 