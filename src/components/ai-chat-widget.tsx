"use client";

import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type ChatMessage = { role: "guest" | "assistant"; content: string };

export function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hi, I can help with rooms, rates, availability, directions, or booking retrieval." },
  ]);

  async function submit() {
    if (!input.trim()) return;
    const message = input.trim();
    setInput("");
    setMessages((current) => [...current, { role: "guest", content: message }]);
    const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    setMessages((current) => [...current, { role: "assistant", content: data.reply || "Reservations can help you directly on WhatsApp." }]);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <section className="mb-3 flex h-[440px] w-[min(360px,calc(100vw-32px))] flex-col rounded-lg border border-[var(--line)] bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-[var(--line)] p-4">
            <p className="font-semibold">Booking assistant</p>
            <button onClick={() => setOpen(false)} className="rounded-md p-2 hover:bg-[#f1ede5]" aria-label="Close chat">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <p key={index} className={`rounded-lg p-3 text-sm leading-6 ${message.role === "assistant" ? "bg-[#f1ede5]" : "ml-8 bg-[var(--brand)] text-white"}`}>
                {message.content}
              </p>
            ))}
          </div>
          <div className="flex gap-2 border-t border-[var(--line)] p-3">
            <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && submit()} className="min-w-0 flex-1 rounded-md border border-[var(--line)] px-3 text-sm" placeholder="Ask about a room" />
            <button onClick={submit} className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--brand)] text-white" aria-label="Send message">
              <Send size={16} />
            </button>
          </div>
        </section>
      ) : null}
      <button onClick={() => setOpen((value) => !value)} className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand)] text-white shadow-xl" aria-label="Open booking assistant">
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
