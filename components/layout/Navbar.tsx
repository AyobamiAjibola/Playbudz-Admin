"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "@/components/common/NavLink";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="flex h-16 w-full items-center justify-between px-6 lg:px-12">
        <NavLink
          href="/"
          exact
          className="text-xl font-bold tracking-tight text-black/80"
        >
          Brand
        </NavLink>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                exact={link.href === "/"}
                className="text-sm font-medium transition-colors hover:text-blue-400"
                activeClassName="text-blue-400"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button size="sm">Get Started</Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="text-foreground md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-border transition-[max-height] duration-300 md:hidden",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                exact={link.href === "/"}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-blue-400"
                activeClassName="bg-accent text-blue-400"
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          <li className="pt-2">
            <Button
              className="w-full"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;