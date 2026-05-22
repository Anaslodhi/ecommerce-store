import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { CartProvider } from "@/lib/cartContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TechNest — Premium Electronics & Gadgets Store",
  description:
    "Discover cutting-edge electronics, laptops, smartphones, headphones, and accessories at TechNest. AI-powered shopping experience with the best prices.",
  keywords: [
    "electronics",
    "gadgets",
    "laptops",
    "smartphones",
    "headphones",
    "e-commerce",
    "tech store",
  ],
};

import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col font-sans">
        <Providers>
          <CartProvider>
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
            <ChatWidget />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}

