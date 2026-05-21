"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/lib/cartContext";

interface AddToCartSectionProps {
  product: Product;
}

export default function AddToCartSection({ product }: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const increment = () => setQuantity((q) => Math.min(q + 1, 10));
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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
        onClick={handleAddToCart}
        disabled={!product.inStock || added}
        className={`group relative flex flex-1 items-center justify-center gap-3 overflow-hidden rounded-xl px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 sm:flex-initial ${
          added
            ? "bg-emerald-600 shadow-emerald-500/25"
            : "bg-gradient-to-r from-violet-600 to-indigo-600 shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40"
        } disabled:cursor-not-allowed disabled:opacity-50`}
      >
        {added ? (
          <>
            <Check className="h-5 w-5" />
            <span>Added to Cart!</span>
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
          </>
        )}
        {/* Shimmer */}
        {!added && (
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        )}
      </button>
    </div>
  );
}
