"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, Package } from "lucide-react";
import { products, getCategories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  all: "All Products",
  laptops: "Laptops",
  phones: "Smartphones",
  audio: "Audio",
  wearables: "Wearables",
  accessories: "Accessories",
  tablets: "Tablets",
  gaming: "Gaming",
};

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name: A → Z" },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const categories = ["all", ...getCategories()];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="relative overflow-hidden border-b border-[var(--border-color)] bg-[var(--background-secondary)]">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Our{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Products
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--text-secondary)] sm:text-lg">
              Browse our curated collection of {products.length} premium electronics and gadgets.
              Find exactly what you need with our filters.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Products */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Search & Sort Bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] py-3 pl-11 pr-10 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all duration-200 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="h-4 w-4 text-[var(--text-muted)]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-all duration-200 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                activeCategory === cat
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25"
                  : "border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:border-violet-500/30 hover:text-violet-300"
              )}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-[var(--text-muted)]">
          Showing{" "}
          <span className="font-semibold text-[var(--text-primary)]">
            {filteredProducts.length}
          </span>{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
          {activeCategory !== "all" && (
            <>
              {" "}
              in{" "}
              <span className="font-semibold text-violet-400">
                {categoryLabels[activeCategory]}
              </span>
            </>
          )}
          {searchQuery && (
            <>
              {" "}
              for &ldquo;
              <span className="font-semibold text-violet-400">{searchQuery}</span>
              &rdquo;
            </>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)]">
              <Package className="h-10 w-10 text-[var(--text-muted)]" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
              No products found
            </h3>
            <p className="max-w-md text-sm text-[var(--text-muted)]">
              We couldn&apos;t find any products matching your search. Try adjusting your
              filters or search terms.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-6 rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
