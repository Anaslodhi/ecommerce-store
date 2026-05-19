# Task 004: Product Catalog & Product Detail Pages

## Status
Not Started

## Priority
High

## Description
Build the Product Catalog page (`/products`) displaying all products in a filterable, searchable grid. Build the individual Product Detail page (`/products/[id]`) showing full product information, images, specifications, and an "Add to Cart" button. Expand the product dataset to 10–15 realistic items covering laptops, smartphones, headphones, smartwatches, and accessories.

## Acceptance Criteria
- [ ] `app/products/page.tsx` renders a grid of all products using `ProductCard` components
- [ ] Search bar allows filtering products by name/description
- [ ] Category filter buttons/tabs (e.g., All, Laptops, Phones, Accessories, Audio, Wearables)
- [ ] Products grid is responsive (1 col mobile, 2 cols tablet, 3–4 cols desktop)
- [ ] `app/products/[id]/page.tsx` renders full product details:
  - Large product image
  - Product name, price, rating, and availability
  - Full description and key specifications
  - "Add to Cart" button with quantity selector
  - Related products section
- [ ] `data/products.ts` expanded to 10–15 products with fields: id, name, slug, price, originalPrice, category, image, description, specs, rating, reviewCount, inStock, featured
- [ ] Clicking a `ProductCard` navigates to `/products/[id]`
- [ ] Breadcrumb navigation on the detail page
- [ ] Pages are responsive and visually polished
- [ ] No TypeScript errors

## Time Estimation
4 hours
