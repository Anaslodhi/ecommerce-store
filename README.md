# 🚀 TechNest — AI-Powered Electronics & Gadgets Store

Welcome to TechNest, a modern, responsive, and dynamic e-commerce store dedicated to electronics and gadgets. TechNest features an integrated Retrieval-Augmented Generation (RAG) chatbot that serves as an intelligent shopping assistant, helping users find products, answer queries, and make informed purchasing decisions based on the store's catalog.

---

## 👥 Team Members
👤 Anas Lodhi (Roll No: BSE-23S-167)
👤 Syed Aneeq Ali (Roll No: BSE-23S-150)

Equal Contribution Statement: Both members contributed equally to this project through alternating commits, shared development responsibilities, and collaborative planning.

---

## ✨ Key Features
🛒 Product Catalog: Browse a diverse selection of electronics.
📄 Product Detail Pages: View detailed descriptions, specifications, and pricing.
🛍️ Shopping Cart: Add, remove, and update quantities. State persists via local storage.
🔐 Authentication: Login and signup flows with form validation.
🤖 AI Chatbot: A RAG-powered intelligent shopping assistant.
📱 Responsive Design: Optimized for mobile, tablet, and desktop devices.
🎨 Dark/Light Theming: Modern gradient-based UI with glassmorphism effects.

---

## 🛠️ Technology Stack

Frontend
🖥️ Framework: Next.js 16 (React 19)
💅 Styling: Tailwind CSS v4
🖼️ Icons: Lucide React

Backend & AI
⚙️ Framework: Python (FastAPI)
🧠 AI/Chatbot: RAG architecture, LLM Integration (Gemini)
🗄️ Databases: Qdrant (Vector DB), Neon Tech (PostgreSQL)

---

## 📸 Screenshots

[NOTE] Screenshots will be displayed here once placed in the /public/screenshots/ folder.

🏠 Homepage
![Homepage](/public/screenshots/home.png)

📱 Products Page
![Products](/public/screenshots/products.png)

🛒 Cart
![Cart](/public/screenshots/cart.png)

🤖 Chatbot
![Chatbot](/public/screenshots/chatbot.png)

---

## ⚙️ Installation & Setup Guide

Prerequisites
Make sure you have the following installed on your system:
📦 Node.js (v18 or higher) for the frontend
🐍 Python (v3.10 or higher) for the backend
🛠️ npm or yarn package manager

1️⃣ How to Run Frontend

1. Open your terminal and navigate to the project root directory.

2. Install the necessary dependencies:
npm install

3. Create a .env.local file in the root directory and add the backend URL:
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
*(For deployment, you won't need to change this if both are deployed together on Vercel)*

4. Start the development server:
npm run dev

5. Open your browser and go to http://localhost:3000 to view the frontend.

2️⃣ How to Run Backend

1. Open a new terminal window and navigate to the backend folder:
cd backend

2. (Optional but recommended) Create and activate a virtual environment:
python -m venv venv
source venv/bin/activate (On Windows use: venv\Scripts\activate)

3. Install the Python dependencies:
pip install -r requirements.txt

4. Create a .env file in the backend folder. You will need API keys and links from the following services:
🔑 Google Gemini API: For the LLM reasoning (get from Google AI Studio).
🔑 Qdrant Cloud: For the vector database (get URL and API key from Qdrant Cloud).
🔑 Neon Tech: For the PostgreSQL database (get connection string from Neon).

Your .env file should look like this:
GEMINI_API_KEY=your_gemini_api_key_here
QDRANT_URL=https://your-cluster.cloud.qdrant.io:6333
QDRANT_API_KEY=your_qdrant_api_key_here
DATABASE_URL=postgresql://user:password@your-neon-host.neon.tech/dbname?sslmode=require
FRONTEND_URL=http://localhost:3000
(For deployment, update FRONTEND_URL to your live Vercel URL)

5. Start the FastAPI server:
uvicorn main:app --reload

6. The backend API will be running at http://localhost:8000. You can access the API documentation at http://localhost:8000/docs.

---

## 📚 API Documentation
The backend exposes the following primary endpoints for the chatbot:
🔌 POST /api/chat: Accepts a user query and session ID, returning an AI-generated response based on the product catalog.
🔌 GET /api/history/{session_id}: Retrieves the chat history for a given session.

---

## 🌐 Deployment Process
🚀 **Deployment**: Vercel (Frontend & Backend): Connect the GitHub repository to Vercel. Ensure build commands are set to npm run build and output directory is .next. Add environment variables in the Vercel dashboard.

---

## 🔗 Important Links
🔗 Live Demo Link: [INSERT VERCEL LINK HERE]
🔗 **Backend API Link**: [INSERT VERCEL API LINK HERE]
🔗 Demo Video Link: [INSERT VIDEO LINK HERE]