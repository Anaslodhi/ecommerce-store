# TechNest E-Commerce Store — Development Plan

## Tech Stack

| Layer        | Technology                              |
| ------------ | --------------------------------------- |
| Frontend     | Next.js 14+ (App Router), React 18+    |
| Language     | TypeScript                              |
| Styling      | Tailwind CSS                            |
| Icons        | Lucide React                            |
| Utilities    | clsx, tailwind-merge, CVA               |
| Backend      | Python FastAPI                          |
| LLM          | OpenAI API (GPT-3.5-turbo / GPT-4)     |
| Vector DB    | Qdrant Cloud (Free Tier)                |
| Database     | Neon Serverless Postgres                |
| Deployment   | Vercel (frontend & backend)             |

---

## File Structure

```
ecommerce-store/
├── .spec/
│   ├── constitution.md
│   ├── plan.md
│   └── tasks/
│       ├── 001-setup.md
│       ├── 002-layout-navbar-footer.md
│       ├── 003-homepage.md
│       ├── 004-product-pages.md
│       ├── 005-cart-and-auth.md
│       ├── 006-backend-chatbot.md
│       ├── 007-testing-polish.md
│       └── 008-deployment.md
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Homepage
│   ├── products/
│   │   ├── page.tsx          # Product Catalog
│   │   └── [id]/
│   │       └── page.tsx      # Product Detail
│   ├── cart/
│   │   └── page.tsx          # Shopping Cart
│   ├── login/
│   │   └── page.tsx          # Login Page
│   ├── signup/
│   │   └── page.tsx          # Signup Page
│   └── about/
│       └── page.tsx          # About Page
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── ProductCard.tsx
│   ├── CartItem.tsx
│   ├── ChatWidget.tsx
│   └── ui/                   # Shared UI primitives
│       ├── Button.tsx
│       └── Input.tsx
├── lib/
│   ├── utils.ts              # cn() helper, misc utilities
│   └── cartContext.tsx        # Cart state (React Context)
├── data/
│   └── products.ts           # Static product dataset (10-15 items)
├── types/
│   └── index.ts              # Shared TypeScript interfaces
├── public/
│   └── images/               # Product & hero images
├── backend/
│   ├── main.py               # FastAPI app entry point
│   ├── requirements.txt
│   ├── .env                  # Backend secrets (never committed)
│   ├── routers/
│   │   └── chat.py           # /chat endpoint
│   ├── services/
│   │   ├── openai_service.py
│   │   ├── qdrant_service.py
│   │   └── db_service.py
│   └── data/
│       └── products.json     # 10-15 product records for Qdrant ingestion
├── .env.local                # Frontend secrets (never committed)
├── .gitignore
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Development Phases

### Phase 1: Project Setup (Task 001)
- Initialize Next.js 14 project with TypeScript + Tailwind CSS
- Install dependencies (lucide-react, clsx, tailwind-merge, CVA)
- Create `.spec/` folder with constitution, plan, and task files
- Configure `.gitignore` to exclude `.env` / `.env.local`
- Verify dev server runs successfully

### Phase 2: Layout & Core UI (Tasks 002–003)
- Build the global layout (`app/layout.tsx`) with Navbar and Footer
- Design a responsive Navbar with links: Home, Products, Cart, Login
- Build a polished Footer with branding and quick links
- Create the Homepage with:
  - Hero section (headline, CTA, hero image)
  - Featured Products grid (3–6 items)
  - About / value proposition section
  - Newsletter / CTA section

### Phase 3: Product & E-Commerce Pages (Tasks 004–005)
- Build the Product Catalog page (`/products`) with grid layout, search, and category filters
- Build the Product Detail page (`/products/[id]`) with images, specs, reviews, and "Add to Cart"
- Implement a Shopping Cart page (`/cart`) with quantity controls, price summary, and checkout CTA
- Build Login (`/login`) and Signup (`/signup`) pages with form validation and UI
- Create Cart Context (React Context API) for global cart state management

### Phase 4: RAG Chatbot Backend & Integration (Task 006)
- Set up FastAPI backend with `/chat` and `/history` endpoints
- Generate 10–15 realistic product JSON records for Qdrant ingestion
- Embed product data into Qdrant Cloud vector store
- Wire up OpenAI API for response generation with retrieved context
- Store chat history in Neon Postgres
- Build a ChatWidget component on the frontend with message bubbles, typing indicator, and mobile responsiveness

### Phase 5: Testing, Polish & Deployment (Tasks 007–008)
- End-to-end testing of all pages and the chatbot
- Performance optimization (image optimization, lazy loading, code splitting)
- Accessibility audit and fixes
- Write comprehensive README.md (with both team member names, setup instructions, screenshots)
- Deploy frontend to Vercel
- Deploy backend to Vercel
- Record 2–3 minute demo video

---

## Feature Checklist

- [x] Next.js 14 project initialized
- [ ] Responsive Navbar & Footer
- [ ] Homepage with hero, featured products, about, CTA
- [ ] Product Catalog page with grid and filters
- [ ] Product Detail page with full info
- [ ] Shopping Cart page with state management
- [ ] Login page with form validation
- [ ] Signup page with form validation
- [ ] About page
- [ ] FastAPI backend with /chat endpoint
- [ ] Qdrant Cloud integration for product embeddings
- [ ] OpenAI API integration for chatbot responses
- [ ] Neon Postgres for chat history
- [ ] ChatWidget component on frontend
- [ ] Mobile-responsive across all pages
- [ ] Performance optimized
- [ ] Deployed to Vercel
- [ ] README.md with full documentation

---

## Timeline Estimation

| Phase | Tasks       | Estimated Time |
| ----- | ----------- | -------------- |
| 1     | 001         | 2 hours        |
| 2     | 002–003     | 6 hours        |
| 3     | 004–005     | 8 hours        |
| 4     | 006         | 6 hours        |
| 5     | 007–008     | 4 hours        |
| **Total** |         | **~26 hours**  |
