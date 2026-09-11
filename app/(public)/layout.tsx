"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function PublicLayout({
  children,
}: PropsWithChildren) {
  const router = useRouter();
  const {user, isLoading} = useAuthStore((state) => state);

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  return <>{children}</>;
}