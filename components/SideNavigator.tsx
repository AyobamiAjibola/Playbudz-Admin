"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  // {
  //   label: "Profile",
  //   href: "/profile",
  //   icon: User,
  // }
];

export default function SideNavigator() {
  const pathname = usePathname();
  const signOut = useAuthStore((state) => state.signOut);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut()
    } catch (error) {
      console.log(error, "error XXXX")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r bg-white p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">
          Admin
        </h1>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 rounded-xl px-4 py-3
                transition-colors
                ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <Button
        className="
          mt-auto flex cursor-pointer items-center gap-3
          rounded-xl px-4 py-5 text-red-500
          hover:bg-red-50 bg-gray-100
        "
        onClick={handleSignOut}
      >
        <LogOut size={20} />
        {isLoading ? 'Logout...' : 'Logout'}
      </Button>
    </aside>
  );
}