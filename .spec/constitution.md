# TechNest E-Commerce Store — Constitution

## Mission

To build a modern, responsive, and AI-powered e-commerce storefront for electronics and gadgets that delivers a premium shopping experience with intelligent product discovery through a RAG-based chatbot.

## Core Principles

1. **User-First Design**: Every design decision prioritizes user experience — fast load times, intuitive navigation, and accessible interfaces across all devices.
2. **Type Safety & Reliability**: TypeScript is used throughout the frontend to catch errors at compile time, ensuring robust and maintainable code.
3. **AI-Driven Discovery**: The integrated RAG chatbot empowers users to discover products through natural language queries, going beyond traditional search and filters.
4. **Clean Architecture**: Code is organized into modular, reusable components with clear separation of concerns between the Next.js frontend and the FastAPI backend.
5. **Security by Default**: Environment variables and API keys are never committed to version control. Authentication flows follow modern security best practices.

## Technical Standards

- **Framework**: Next.js 14+ with App Router for server-side rendering and routing
- **Language**: TypeScript (strict mode) for all frontend code
- **Styling**: Tailwind CSS with a consistent design system (colors, spacing, typography)
- **Icons**: Lucide React for a cohesive icon set
- **Utilities**: `clsx`, `tailwind-merge`, and `class-variance-authority` for conditional styling
- **Backend**: Python FastAPI for the RAG chatbot API
- **Vector DB**: Qdrant Cloud (free tier) for product embeddings and semantic search
- **Database**: Neon Serverless Postgres for persisting chat history
- **LLM**: OpenAI API (GPT-3.5/4) for generating chatbot responses
- **Deployment**: Vercel (frontend and backend)

## Design Guidelines

- **Mobile-first** responsive approach — design for small screens first, enhance for desktop
- **Consistent spacing** using Tailwind's spacing scale (4px base unit)
- **Color palette**: Dark/modern theme with accent colors for CTAs and interactive elements
- **Typography**: Clean sans-serif fonts (Inter via Google Fonts)
- **Imagery**: High-quality product images with consistent aspect ratios
- **Micro-animations**: Subtle transitions on hover, page loads, and interactive elements
- **Accessibility**: Semantic HTML, proper ARIA labels, keyboard navigability, and sufficient color contrast

## Development Rules

1. All components must be placed in the `/components` directory with PascalCase naming.
2. Page routes use the Next.js App Router convention inside `/app`.
3. Shared utilities and helpers live in `/lib`.
4. Product data and types are defined in `/data` and `/types` respectively.
5. Environment variables must never be committed — `.env` and `.env.local` are in `.gitignore`.
6. Every PR/commit should address a single task from `.spec/tasks/`.
7. Code must be formatted, linted, and free of TypeScript errors before committing.
