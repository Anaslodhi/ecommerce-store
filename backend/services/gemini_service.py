import os
from google import genai
from google.genai import types

def get_client():
    return genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def get_embedding(text: str) -> list[float]:
    """Generate embedding for text using Google Gemini."""
    client = get_client()
    response = client.models.embed_content(
        model='gemini-embedding-2',
        contents=text,
    )
    return response.embeddings[0].values

def generate_chat_response(query: str, context: str, chat_history: list[dict]) -> str:
    """Generate chatbot response using Gemini with RAG context."""
    client = get_client()
    system_prompt = f"""You are TechNest AI, a helpful and knowledgeable shopping assistant for TechNest electronics store. 
You help customers find products, compare specifications, and make purchase decisions.

Here is relevant product information from our catalog:
{context}

Rules:
- Only recommend products from the context provided above.
- If asked about products not in our catalog, politely say you don't have information about those.
- Be concise, friendly, and helpful.
- Format prices with $ and two decimal places.
- When comparing products, use clear bullet points."""

    messages = []
    
    # Add recent chat history (last 10 messages)
    for msg in chat_history[-10:]:
        role = "user" if msg["role"] == "user" else "model"
        messages.append({"role": role, "parts": [{"text": msg["content"]}]})
    
    messages.append({"role": "user", "parts": [{"text": query}]})
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=messages,
        config=types.GenerateContentConfig(
            system_instruction=system_prompt,
            temperature=0.7,
        )
    )
    
    return response.text
