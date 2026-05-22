# Task 006: RAG Chatbot Backend & Frontend Integration

## Status
Completed

## Priority
High

## Description
Build the Python FastAPI backend that powers the RAG chatbot. Generate 10–15 detailed, realistic product JSON records and ingest them into Qdrant Cloud as vector embeddings. Implement the `/chat` endpoint that retrieves relevant product context from Qdrant, generates a response via OpenAI API, and stores chat history in Neon Postgres. On the frontend, build a ChatWidget component that floats on every page, supports message input/display, typing indicators, and is mobile-responsive.

## Acceptance Criteria

### Backend
- [x] `backend/main.py` sets up FastAPI with CORS middleware
- [x] `backend/data/products.json` contains **20** realistic product records with fields: id, name, category, price, description, specs, features, rating (covering laptops, phones, audio, wearables, accessories, tablets, gaming)
- [x] `backend/services/qdrant_service.py`:
  - Connects to Qdrant Cloud
  - Provides function to embed and upsert product data
  - Provides function to search for relevant products given a query
- [x] `backend/services/openai_service.py`:
  - Connects to OpenAI API
  - Generates embeddings for product data and queries
  - Generates chatbot responses with retrieved context as system prompt
- [x] `backend/services/db_service.py`:
  - Connects to Neon Postgres
  - Creates chat_history table (id, session_id, role, content, timestamp)
  - Functions to save and retrieve chat history
- [x] `backend/routers/chat.py`:
  - `POST /chat` — accepts query + session_id, retrieves context from Qdrant, generates response, saves to DB, returns response
  - `GET /history/{session_id}` — returns chat history for a session
- [x] `backend/requirements.txt` lists all Python dependencies
- [x] `backend/.env.example` template documented (never committed)
- [x] Ingest script (`backend/ingest.py`) to populate Qdrant with product embeddings
- [x] `backend/pyproject.toml` with uv project config, 38 packages installed via `uv sync`

### Frontend
- [x] `components/ChatWidget.tsx`:
  - Floating chat button (bottom-right corner) with pulse animation
  - Expandable chat window with message bubbles (user vs. bot)
  - Text input with send button
  - Typing/loading indicator (3 animated dots) while waiting for response
  - Session management (unique session ID via crypto.randomUUID)
  - Mobile-responsive (full-width on <640px) and does not obstruct page content
- [x] ChatWidget integrated into `app/layout.tsx` so it appears on all pages
- [x] Error handling for API failures with user-friendly messages
- [x] `.env.local` stores the backend API URL (`NEXT_PUBLIC_BACKEND_URL`)

### General
- [x] Frontend compiles with zero TypeScript errors
- [x] Backend code structure is correct (requires API keys in `.env` to run live)
- [x] No TypeScript or Python errors

## Notes
- To run the backend: configure `backend/.env` with OPENAI_API_KEY, QDRANT_URL, QDRANT_API_KEY, DATABASE_URL, then run `uv run uvicorn backend.main:app --reload` from the project root
- To ingest products: `uv run python backend/ingest.py`

## Time Estimation
6 hours

