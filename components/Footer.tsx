import Link from "next/link";
import {
  Zap,
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageCircle,
  Share2,
  Heart,
} from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/cart", label: "Shopping Cart" },
];

const categories = [
  { href: "/products?category=laptops", label: "Laptops" },
  { href: "/products?category=phones", label: "Smartphones" },
  { href: "/products?category=audio", label: "Audio" },
  { href: "/products?category=wearables", label: "Wearables" },
  { href: "/products?category=accessories", label: "Accessories" },
];

const socialLinks = [
  { href: "#", icon: Globe, label: "Website" },
  { href: "#", icon: MessageCircle, label: "Chat" },
  { href: "#", icon: Share2, label: "Share" },
  { href: "#", icon: Heart, label: "Follow" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--footer-bg)]">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-2 text-xl font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md shadow-violet-500/25 transition-transform duration-200 group-hover:scale-110">
                <Zap className="h-5 w-5" />
              </span>
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                TechNest
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--text-muted)]">
              Your premium destination for cutting-edge electronics and gadgets.
              Discover the latest in tech with unbeatable prices and exceptional service.
            </p>
            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] transition-all duration-200 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-400"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] transition-colors duration-200 hover:text-violet-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.label}>
                  <Link
                    href={cat.href}
                    className="text-sm text-[var(--text-muted)] transition-colors duration-200 hover:text-violet-400"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                <span>support@technest.store</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                <span>+92 (300) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                <span>Islamabad, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border-color)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} TechNest. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[var(--text-muted)] transition-colors hover:text-violet-400">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-[var(--text-muted)] transition-colors hover:text-violet-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
