"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, Package } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/lib/cartContext";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItemRow({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  const lineTotal = product.price * quantity;

  return (
    <div className="flex gap-4 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 transition-all duration-200 hover:border-violet-500/20 sm:gap-6 sm:p-5">
      {/* Product Image Placeholder */}
      <Link
        href={`/products/${product.slug}`}
        className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--background-secondary)] to-[var(--card-bg)] sm:h-28 sm:w-28"
      >
        <div className="text-center">
          <Package className="mx-auto h-8 w-8 text-violet-400/40" />
          <span className="mt-1 block text-[10px] text-[var(--text-muted)]">
            {product.category}
          </span>
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link
            href={`/products/${product.slug}`}
            className="text-sm font-semibold text-[var(--text-primary)] transition-colors hover:text-violet-400 sm:text-base"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
            {product.shortDescription}
          </p>
        </div>

        {/* Bottom Row: Price, Quantity, Remove */}
        <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Unit Price */}
          <span className="text-sm font-semibold text-[var(--text-secondary)]">
            ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })} each
          </span>

          {/* Quantity Selector */}
          <div className="flex items-center overflow-hidden rounded-lg border border-[var(--border-color)] bg-[var(--background)]">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
              className="flex h-8 w-8 items-center justify-center text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="flex h-8 w-10 items-center justify-center border-x border-[var(--border-color)] text-xs font-bold text-[var(--text-primary)]">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              disabled={quantity >= 10}
              className="flex h-8 w-8 items-center justify-center text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeItem(product.id)}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-red-400/80 transition-colors hover:bg-red-500/10 hover:text-red-400"
            aria-label={`Remove ${product.name} from cart`}
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Remove</span>
          </button>

          {/* Line Total — pushed right */}
          <span className="ml-auto text-base font-bold text-[var(--text-primary)] sm:text-lg">
            ${lineTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}
