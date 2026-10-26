'use client'

import Link from "next/link";
import { Menu, User } from "lucide-react";
import { NavLinks } from "./nav-links";
import { useSession,signOut } from "@/lib/auth-client";
import { Button } from "../ui/button";


export function Navbar() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <p>Loading...</p>
  }



  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">



      <nav className="relative mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: primary links */}
        <div className="flex items-center gap-6">
          <NavLinks />
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


        {
          session?.user ?

            <div className="flex gap-4 ">

              <Link
                href="/profile"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 transition-colors hover:text-brand"
              >
                <User className="size-4" />
                Profile
              </Link>

              <Button onClick={() => signOut()} className={"bg-red-500"}>SignOut</Button>
            </div>
            :

            <div>
              <div className="flex items-center gap-5">

                <Link
                  href="/sign-in"
                  className="hidden text-sm font-medium text-neutral-700 transition-colors hover:text-brand sm:inline"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="text-sm font-medium text-neutral-700 transition-colors hover:text-brand"
                >
                  Sign Up
                </Link>
              </div>
            </div>
        }
        {/* Right: account links */}

      </nav>
    </header >
  );
}
