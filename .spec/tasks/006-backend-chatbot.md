# Task 006: RAG Chatbot Backend & Frontend Integration

## Status
Not Started

## Priority
High

## Description
Build the Python FastAPI backend that powers the RAG chatbot. Generate 10–15 detailed, realistic product JSON records and ingest them into Qdrant Cloud as vector embeddings. Implement the `/chat` endpoint that retrieves relevant product context from Qdrant, generates a response via OpenAI API, and stores chat history in Neon Postgres. On the frontend, build a ChatWidget component that floats on every page, supports message input/display, typing indicators, and is mobile-responsive.

## Acceptance Criteria

### Backend
- [ ] `backend/main.py` sets up FastAPI with CORS middleware
- [ ] `backend/data/products.json` contains 10–15 realistic product records with fields: id, name, category, price, description, specs, features, rating (covering laptops, phones, headphones, smartwatches, accessories)
- [ ] `backend/services/qdrant_service.py`:
  - Connects to Qdrant Cloud
  - Provides function to embed and upsert product data
  - Provides function to search for relevant products given a query
- [ ] `backend/services/openai_service.py`:
  - Connects to OpenAI API
  - Generates embeddings for product data and queries
  - Generates chatbot responses with retrieved context as system prompt
- [ ] `backend/services/db_service.py`:
  - Connects to Neon Postgres
  - Creates chat_history table (id, session_id, role, content, timestamp)
  - Functions to save and retrieve chat history
- [ ] `backend/routers/chat.py`:
  - `POST /chat` — accepts query + session_id, retrieves context from Qdrant, generates response, saves to DB, returns response
  - `GET /history/{session_id}` — returns chat history for a session
- [ ] `backend/requirements.txt` lists all Python dependencies
- [ ] `backend/.env` template documented (never committed)
- [ ] Ingest script to populate Qdrant with product embeddings

### Frontend
- [ ] `components/ChatWidget.tsx`:
  - Floating chat button (bottom-right corner)
  - Expandable chat window with message bubbles (user vs. bot)
  - Text input with send button
  - Typing/loading indicator while waiting for response
  - Session management (unique session ID per user)
  - Mobile-responsive and does not obstruct page content
- [ ] ChatWidget integrated into `app/layout.tsx` so it appears on all pages
- [ ] Error handling for API failures with user-friendly messages
- [ ] `.env.local` stores the backend API URL

### General
- [ ] Chatbot correctly answers questions about products in the catalog
- [ ] Chat history is persisted and retrievable
- [ ] No TypeScript or Python errors

## Time Estimation
6 hours
