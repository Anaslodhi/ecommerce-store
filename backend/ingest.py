"""Script to ingest product data into Qdrant vector store."""
import os
import sys
from dotenv import load_dotenv

# Load env vars
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

# Add parent to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from backend.services.qdrant_service import ingest_products

if __name__ == "__main__":
    print("Starting product ingestion into Qdrant...")
    count = ingest_products()
    print(f"Successfully ingested {count} products into Qdrant Cloud.")
