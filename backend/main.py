import os
from dotenv import load_dotenv
load_dotenv()  # Load .env before anything else

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat
from services import db_service

app = FastAPI(
    title="TechNest Chatbot API",
    description="RAG-powered chatbot API for TechNest e-commerce store",
    version="1.0.0",
)

# CORS — allow frontend origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        os.getenv("FRONTEND_URL", "http://localhost:3000"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize DB on startup
@app.on_event("startup")
async def startup():
    db_service.init_db()

# Include routers
app.include_router(chat.router, prefix="/api", tags=["Chat"])

@app.get("/")
async def root():
    return {"message": "TechNest Chatbot API is running", "version": "1.0.0"}

@app.get("/health")
async def health():
    return {"status": "healthy"}
