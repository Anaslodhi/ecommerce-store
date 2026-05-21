import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  ChevronRight,
  Check,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  Package,
  Zap,
} from "lucide-react";
import { products, getProductBySlug } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";
import AddToCartSection from "./AddToCartSection";

// Generate static params for all product slugs
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} — TechNest`,
    description: product.shortDescription,
  };
}

const categoryLabels: Record<string, string> = {
  laptops: "Laptops",
  phones: "Smartphones",
  audio: "Audio",
  wearables: "Wearables",
  accessories: "Accessories",
  tablets: "Tablets",
  gaming: "Gaming",
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  // Related products: same category, excluding current product, max 4
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <nav
        className="border-b border-[var(--border-color)] bg-[var(--background-secondary)]"
        aria-label="Breadcrumb"
      >
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li>
              <Link
                href="/"
                className="text-[var(--text-muted)] transition-colors hover:text-violet-400"
              >
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5 text-[var(--text-muted)]" />
            </li>
            <li>
              <Link
                href="/products"
                className="text-[var(--text-muted)] transition-colors hover:text-violet-400"
              >
                Products
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5 text-[var(--text-muted)]" />
            </li>
            <li>
              <Link
                href={`/products?category=${product.category}`}
                className="text-[var(--text-muted)] transition-colors hover:text-violet-400"
              >
                {categoryLabels[product.category] || product.category}
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5 text-[var(--text-muted)]" />
            </li>
            <li className="truncate font-medium text-[var(--text-primary)]">
              {product.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* Product Detail */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Product Image */}
          <div className="relative">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-[var(--border-color)] bg-gradient-to-br from-[var(--background-secondary)] to-[var(--card-bg)]">
              {/* Badge */}
              {product.badge && (
                <span className="absolute left-4 top-4 z-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-violet-500/25">
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute right-4 top-4 z-10 rounded-full bg-emerald-500/90 px-2.5 py-1 text-xs font-bold text-white">
                  -{discount}%
                </span>
              )}

              {/* Image placeholder */}
              <div className="flex aspect-square items-center justify-center p-12">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-3xl bg-violet-500/10">
                    <Package className="h-12 w-12 text-violet-400/50" />
                  </div>
                  <span className="text-sm font-medium text-[var(--text-muted)]">
                    {product.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            {/* Category */}
            <div className="mb-3 inline-flex items-center gap-2">
              <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-400">
                {categoryLabels[product.category] || product.category}
              </span>
              {product.inStock ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <Check className="h-3 w-3" />
                  In Stock
                </span>
              ) : (
                <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="mb-4 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-600 text-gray-600"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                {product.rating} out of 5
              </span>
              <span className="text-sm text-[var(--text-muted)]">
                ({product.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-[var(--text-primary)] sm:text-4xl">
                $
                {product.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-[var(--text-muted)] line-through">
                    $
                    {product.originalPrice.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-sm font-bold text-emerald-400">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="mb-8 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {product.description}
            </p>

            {/* Add to Cart Section (client component) */}
            <AddToCartSection product={product} />

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3 text-center">
                <Truck className="h-5 w-5 text-violet-400" />
                <span className="text-xs text-[var(--text-muted)]">
                  Free Shipping
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3 text-center">
                <Shield className="h-5 w-5 text-violet-400" />
                <span className="text-xs text-[var(--text-muted)]">
                  2-Year Warranty
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3 text-center">
                <RotateCcw className="h-5 w-5 text-violet-400" />
                <span className="text-xs text-[var(--text-muted)]">
                  30-Day Returns
                </span>
              </div>
            </div>

            {/* Specifications */}
            <div className="mt-10">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[var(--text-primary)]">
                <Zap className="h-5 w-5 text-violet-400" />
                Key Specifications
              </h2>
              <div className="overflow-hidden rounded-xl border border-[var(--border-color)]">
                {Object.entries(product.specs).map(([key, value], i) => (
                  <div
                    key={key}
                    className={cn(
                      "flex items-start gap-4 px-5 py-3.5 text-sm",
                      i % 2 === 0
                        ? "bg-[var(--card-bg)]"
                        : "bg-[var(--background-secondary)]"
                    )}
                  >
                    <span className="w-32 shrink-0 font-semibold text-[var(--text-secondary)]">
                      {key}
                    </span>
                    <span className="text-[var(--text-primary)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mt-8">
              <h2 className="mb-4 text-lg font-bold text-[var(--text-primary)]">
                Key Features
              </h2>
              <ul className="space-y-3">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-[var(--border-color)] bg-[var(--background-secondary)] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Related{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Products
              </span>
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
