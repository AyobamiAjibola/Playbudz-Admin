"use client";

import SideNavigator from "@/components/SideNavigator";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {user, isLoading} = useAuthStore((state) => state)
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading && !user) {
  //     router.replace("/login");
  //   }
  // }, [isLoading, user, router]);

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Redirecting...
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen">
      <SideNavigator />

      <main className="flex-1 bg-gray-50 p-6">
        {children}
      </main>
    </div>
  )
}