from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services import qdrant_service, gemini_service, db_service

router = APIRouter()

class ChatRequest(BaseModel):
    query: str
    session_id: str

class ChatResponse(BaseModel):
    response: str
    session_id: str
    products: list[dict] = []

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # 1. Search relevant products from Qdrant
        relevant_products = qdrant_service.search_products(request.query, top_k=3)
        
        # 2. Build context from retrieved products
        context_parts = []
        for p in relevant_products:
            context_parts.append(
                f"Product: {p['name']}\n"
                f"Category: {p['category']}\n"
                f"Price: ${p['price']}\n"
                f"Description: {p['description']}\n"
                f"Features: {', '.join(p.get('features', []))}\n"
                f"Rating: {p.get('rating', 'N/A')}/5\n"
            )
        context = "\n---\n".join(context_parts)
        
        # 3. Get chat history
        history = db_service.get_history(request.session_id, limit=10)
        
        # 4. Generate response via OpenAI
        response_text = gemini_service.generate_chat_response(
            query=request.query,
            context=context,
            chat_history=history
        )
        
        # 5. Save messages to DB
        db_service.save_message(request.session_id, "user", request.query)
        db_service.save_message(request.session_id, "assistant", response_text)
        
        return ChatResponse(
            response=response_text,
            session_id=request.session_id,
            products=relevant_products
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history/{session_id}")
async def get_chat_history(session_id: str):
    try:
        history = db_service.get_history(session_id)
        return {"session_id": session_id, "messages": history}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
