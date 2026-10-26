"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "All Destinations", href: "/all-destinations" },
  { label: "My Bookings", href: "/my-booking" },
  { label: "Admin", href: "/admin" },
];

function isActiveLink(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-6 md:flex">
      {navLinks.map((link) => {
        const isActive = isActiveLink(pathname, link.href);

        return (
          <li key={link.label}>
            <Link
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`relative text-sm font-medium transition-colors hover:text-brand ${
                isActive
                  ? "text-brand after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-brand"
                  : "text-neutral-700"
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
