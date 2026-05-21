"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Product } from "@/types";

interface AddToCartSectionProps {
  product: Product;
}

export default function AddToCartSection({ product }: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((q) => Math.min(q + 1, 10));
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1));

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      {/* Quantity Selector */}
      <div className="flex items-center overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]">
        <button
          onClick={decrement}
          disabled={quantity <= 1}
          className="flex h-12 w-12 items-center justify-center text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] disabled:opacity-40 disabled:hover:bg-transparent"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="flex h-12 w-14 items-center justify-center border-x border-[var(--border-color)] text-sm font-bold text-[var(--text-primary)]">
          {quantity}
        </span>
        <button
          onClick={increment}
          disabled={quantity >= 10}
          className="flex h-12 w-12 items-center justify-center text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] disabled:opacity-40 disabled:hover:bg-transparent"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        disabled={!product.inStock}
        className="group relative flex flex-1 items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed sm:flex-initial"
      >
        <ShoppingCart className="h-5 w-5" />
        <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
        {/* Shimmer */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </button>
    </div>
  );
}
