"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps
  extends LinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  activeClassName?: string;
  exact?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    {
      href,
      className,
      activeClassName,
      exact = false,
      children,
      ...props
    },
    ref,
  ) => {
    const pathname = usePathname();

    const hrefString = href.toString();

    const isActive = exact
      ? pathname === hrefString
      : pathname === hrefString || pathname.startsWith(`${hrefString}/`);

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };