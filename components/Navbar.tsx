"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cartContext";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { getItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  const itemCount = getItemCount();

  // Track scroll for backdrop blur effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--nav-bg-scrolled)] backdrop-blur-xl shadow-lg shadow-black/5"
          : "bg-[var(--nav-bg)]"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md shadow-violet-500/25 transition-transform duration-200 group-hover:scale-110">
            <Zap className="h-5 w-5" />
          </span>
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            TechNest
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200",
                isActive(link.href)
                  ? "text-violet-400"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/cart"
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200",
              isActive("/cart")
                ? "bg-violet-500/10 text-violet-400"
                : "text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
            )}
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-1 text-[10px] font-bold text-white shadow-lg shadow-violet-500/30">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-[var(--text-primary)]">
                {session.user?.name?.split(" ")[0] || "User"}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium text-[var(--text-secondary)] transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className={cn(
                "flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-all duration-200",
                isActive("/login") || isActive("/signup")
                  ? "bg-violet-500/10 text-violet-400"
                  : "text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
              )}
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-1 text-[10px] font-bold text-white shadow-lg shadow-violet-500/30">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed top-16 right-0 z-50 h-[calc(100vh-4rem)] w-72 border-l border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200",
                isActive(link.href)
                  ? "bg-violet-500/10 text-violet-400"
                  : "text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
              )}
            >
              {link.label}
            </Link>
          ))}

          <hr className="my-3 border-[var(--border-color)]" />

          <Link
            href="/cart"
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200",
              isActive("/cart")
                ? "bg-violet-500/10 text-violet-400"
                : "text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
            )}
          >
            <ShoppingCart className="h-5 w-5" />
            Cart
            {itemCount > 0 && (
              <span className="ml-auto rounded-full bg-violet-500/20 px-2 py-0.5 text-xs font-bold text-violet-400">
                {itemCount}
              </span>
            )}
          </Link>
          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:bg-red-500/10 hover:text-red-400"
            >
              <User className="h-5 w-5" />
              Logout ({session.user?.name?.split(" ")[0] || "User"})
            </button>
          ) : (
            <Link
              href="/login"
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200",
                isActive("/login") || isActive("/signup")
                  ? "bg-violet-500/10 text-violet-400"
                  : "text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
              )}
            >
              <User className="h-5 w-5" />
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
