"use client";

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ChatMessage {
  id: string;
  role: "bot" | "user";
  content: string;
  timestamp: Date;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "bot",
  content:
    "👋 Hey there! I'm TechNest AI — your personal shopping assistant. Ask me anything about our products, orders, or recommendations!",
  timestamp: new Date(),
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateSessionId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/* ------------------------------------------------------------------ */
/*  Typing Indicator                                                   */
/* ------------------------------------------------------------------ */

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 max-w-[80%]">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600">
        <Bot className="h-3.5 w-3.5 text-white" />
      </div>
      <div className="rounded-2xl rounded-bl-md bg-[var(--card-bg-hover)] px-4 py-3 border border-[var(--border-color)]">
        <div className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:0ms]" />
          <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:150ms]" />
          <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Message Bubble                                                     */
/* ------------------------------------------------------------------ */

function MessageBubble({ message }: { message: ChatMessage }) {
  const isBot = message.role === "bot";

  return (
    <div
      className={cn("flex items-end gap-2", isBot ? "justify-start" : "justify-end")}
    >
      {/* Bot avatar */}
      {isBot && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600">
          <Bot className="h-3.5 w-3.5 text-white" />
        </div>
      )}

      <div className="flex max-w-[80%] flex-col gap-1">
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isBot
              ? "rounded-bl-md bg-[var(--card-bg-hover)] border border-[var(--border-color)] text-[var(--text-primary)]"
              : "rounded-br-md bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
          )}
        >
          {message.content}
        </div>
        <span
          className={cn(
            "text-[10px] text-[var(--text-muted)]",
            isBot ? "ml-1" : "mr-1 text-right"
          )}
        >
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ChatWidget                                                         */
/* ------------------------------------------------------------------ */

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(generateSessionId);
  const [hasOpened, setHasOpened] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /* Auto-scroll on new messages / typing state change */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* Focus input when chat opens */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  /* Insert welcome message on first open */
  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next && !hasOpened) {
        setMessages([{ ...WELCOME_MESSAGE, timestamp: new Date() }]);
        setHasOpened(true);
      }
      return next;
    });
  }, [hasOpened]);

  /* Send message */
  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed, session_id: sessionId }),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "bot",
        content: data.response ?? data.message ?? "I received your message!",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "bot",
        content:
          "😔 Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, sessionId]);

  /* Keyboard: Enter to send, Shift+Enter for newline */
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* -------------------------------------------------------------- */
  /*  Render                                                         */
  /* -------------------------------------------------------------- */

  return (
    <>
      {/* ---- Chat Window ---- */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-[9999] flex flex-col overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-2xl shadow-violet-500/10 transition-all duration-300",
          "w-[calc(100vw-2rem)] sm:w-[380px]",
          isOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        )}
        style={{ height: "min(500px, calc(100vh - 10rem))" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--background-secondary)] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow-md shadow-violet-500/25">
              <Bot className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                TechNest AI
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs text-[var(--text-muted)]">Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleToggle}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t border-[var(--border-color)] bg-[var(--background-secondary)] p-3">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              rows={1}
              className="flex-1 resize-none rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
                input.trim() && !isTyping
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 active:scale-95"
                  : "bg-[var(--card-bg-hover)] text-[var(--text-muted)] cursor-not-allowed"
              )}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ---- Floating Action Button ---- */}
      <button
        onClick={handleToggle}
        className={cn(
          "fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:shadow-violet-500/50 hover:scale-110 active:scale-95",
          !isOpen && "animate-pulse"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <MessageCircle
          className={cn(
            "h-6 w-6 transition-all duration-300",
            isOpen && "rotate-90 scale-0 opacity-0"
          )}
        />
        <X
          className={cn(
            "absolute h-6 w-6 transition-all duration-300",
            isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          )}
        />
      </button>
    </>
  );
}
