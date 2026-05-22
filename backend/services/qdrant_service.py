import os
import json
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from .gemini_service import get_embedding

COLLECTION_NAME = "technest_products"
VECTOR_SIZE = 3072  # gemini-embedding-2

def get_client() -> QdrantClient:
    return QdrantClient(
        url=os.getenv("QDRANT_URL"),
        port=443,
        api_key=os.getenv("QDRANT_API_KEY"),
    )

def ensure_collection():
    client = get_client()
    collections = [c.name for c in client.get_collections().collections]
    if COLLECTION_NAME not in collections:
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=VECTOR_SIZE, distance=Distance.COSINE),
        )

def ingest_products(products_path: str = None):
    if products_path is None:
        products_path = os.path.join(os.path.dirname(__file__), "..", "data", "products.json")
    
    with open(products_path, "r") as f:
        products = json.load(f)
    
    client = get_client()
    ensure_collection()
    
    points = []
    for product in products:
        # Create rich text for embedding
        text = f"{product['name']} - {product['category']}. {product['description']} Price: ${product['price']}. "
        text += f"Features: {', '.join(product['features'])}. "
        text += f"Specs: {json.dumps(product['specs'])}. Rating: {product['rating']}/5."
        
        embedding = get_embedding(text)
        
        points.append(PointStruct(
            id=int(product["id"]),
            vector=embedding,
            payload=product
        ))
    
    client.upsert(collection_name=COLLECTION_NAME, points=points)
    return len(points)

def search_products(query: str, top_k: int = 3) -> list[dict]:
    client = get_client()
    query_embedding = get_embedding(query)
    
    results = client.query_points(
        collection_name=COLLECTION_NAME,
        query=query_embedding,
        limit=top_k,
    )
    
    return [point.payload for point in results.points]
