"use client";

import Link from "next/link";
import { ShoppingCart, ArrowRight, Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import CartItemRow from "@/components/CartItem";

const SHIPPING_THRESHOLD = 50;
const TAX_RATE = 0.08;

export default function CartPage() {
  const { items, clearCart, getSubtotal, getItemCount } = useCart();

  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : 9.99;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)]">
          <ShoppingCart className="h-12 w-12 text-[var(--text-muted)]" />
        </div>
        <h1 className="mb-3 text-2xl font-extrabold sm:text-3xl">
          Your Cart is Empty
        </h1>
        <p className="mb-8 max-w-md text-base text-[var(--text-secondary)]">
          Looks like you haven&apos;t added anything to your cart yet. Explore
          our collection and find something you love!
        </p>
        <Link
          href="/products"
          className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/40"
        >
          Continue Shopping
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="border-b border-[var(--border-color)] bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Shopping{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Cart
            </span>
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-violet-400"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-red-400/80 transition-colors hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear Cart
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6">
              <h2 className="mb-6 text-lg font-bold text-[var(--text-primary)]">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </span>
                  <span className="font-semibold text-[var(--text-primary)]">
                    ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Shipping</span>
                  <span className="font-semibold text-[var(--text-primary)]">
                    {shipping === 0 ? (
                      <span className="text-emerald-400">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                {shipping === 0 && (
                  <p className="text-xs text-emerald-400/70">
                    ✓ You qualify for free shipping!
                  </p>
                )}

                {shipping > 0 && (
                  <p className="text-xs text-[var(--text-muted)]">
                    Add ${(SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for
                    free shipping
                  </p>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">
                    Estimated Tax
                  </span>
                  <span className="font-semibold text-[var(--text-primary)]">
                    ${tax.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <hr className="border-[var(--border-color)]" />

                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[var(--text-primary)]">
                    Total
                  </span>
                  <span className="text-xl font-extrabold text-[var(--text-primary)]">
                    ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/40">
                <span className="relative z-10 flex items-center gap-2">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>

              {/* Security note */}
              <p className="mt-4 text-center text-[10px] text-[var(--text-muted)]">
                🔒 Secure checkout with 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
