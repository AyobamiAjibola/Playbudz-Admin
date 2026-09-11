"use client";

import { useAuthStore } from "@/store/auth.store";
import { PropsWithChildren, useEffect } from "react";

export function AuthProvider({
  children,
}: PropsWithChildren) {
  const refreshUser = useAuthStore((state) => state.refreshUser);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return <>{children}</>;
}