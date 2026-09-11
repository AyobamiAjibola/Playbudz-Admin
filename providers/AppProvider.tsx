"use client";

import { ReactQueryProvider } from "./ReactQueryProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}