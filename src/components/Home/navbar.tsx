import Link from "next/link";
import { Menu, User } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Admin", href: "/admin" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <nav className="relative mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: primary links */}
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors hover:text-brand ${
                    link.active
                      ? "text-brand after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-brand"
                      : "text-neutral-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Mobile menu trigger (presentational) */}
          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex size-9 items-center justify-center rounded-md text-neutral-700 transition-colors hover:bg-muted md:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>

        {/* Center: logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold tracking-tight text-brand"
        >
          Wanderlast
        </Link>

        {/* Right: account links */}
        <div className="flex items-center gap-5">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 transition-colors hover:text-brand"
          >
            <User className="size-4" />
            Profile
          </Link>
          <Link
            href="/login"
            className="hidden text-sm font-medium text-neutral-700 transition-colors hover:text-brand sm:inline"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium text-neutral-700 transition-colors hover:text-brand"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
