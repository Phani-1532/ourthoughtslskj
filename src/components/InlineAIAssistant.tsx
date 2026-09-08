import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, Bot, User, AlertCircle } from "lucide-react";

type ChatMessage = { role: "bot" | "user"; text: string };

const suggestionsByPage: Record<string, string[]> = {
  contact: ["What happens after I submit?", "Do you offer free consultations?", "How quickly will you respond?"],
  services: ["Which service fits my business?", "Do you offer ongoing support?", "Can you work with my existing team?"],
  products: ["Can I get a demo of the HRMS?", "When is the E-Learning platform launching?", "What's the pricing for your products?"],
};

export const InlineAIAssistant = ({ pageKey }: { pageKey: string }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = suggestionsByPage[pageKey] || ["How can you help me?", "What do you offer?"];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const sendText = useCallback(async (text: string) => {
    if (!text.trim() || typing) return;
    setError(false);

    const userMsg: ChatMessage = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      };

      const conversationMessages = [...messages, userMsg].map(m => ({
        role: m.role === "bot" ? "assistant" : m.role,
        content: m.text,
      }));

      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({ messages: conversationMessages, sessionId: `inline-${pageKey}` }),
      });

      if (!response.ok) throw new Error(`Request failed (${response.status})`);

      const data = await response.json();
      if (!data.reply) throw new Error("No reply in response");

      setMessages(prev => [...prev, { role: "bot", text: data.reply }]);
    } catch {
      setError(true);
      setMessages(prev => [...prev, {
        role: "bot",
        text: "I'm having trouble connecting right now. Please try again or email us at info@ourthoughtslskj.com.",
      }]);
    } finally {
      setTyping(false);
    }
  }, [typing, messages, pageKey]);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
      <div className="bg-gradient-primary p-4 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-primary-foreground/15 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <span className="font-semibold text-primary-foreground text-sm block">AI Assistant</span>
          <span className="text-[10px] text-primary-foreground/70 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/80 animate-pulse" />
            Ask me anything about this page
          </span>
        </div>
      </div>

      <div ref={scrollRef} className="p-3 sm:p-4 space-y-3 min-h-[180px] max-h-[280px] sm:max-h-[320px] overflow-y-auto">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Bot className="w-10 h-10 text-primary/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Have a question? Ask me anything — I'm here to help!</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "bot" && (
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}
            <div className="max-w-[80%]">
              <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-md"
                  : "bg-muted text-foreground rounded-tl-md"
              }`}>{msg.text}</div>
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-primary" />
              </div>
            )}
          </div>
        ))}

        {typing && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {error && !typing && (
          <div className="flex items-center gap-2 text-xs text-destructive/80 px-2">
            <AlertCircle className="w-3.5 h-3.5" />
            Connection issue — please try again.
          </div>
        )}
      </div>

        {messages.length === 0 && (
          <div className="px-3 pb-3 flex flex-wrap gap-1.5">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => sendText(s)}
                disabled={typing}
                className="text-xs px-2.5 py-1.5 rounded-full border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {s}
              </button>
            ))}
          </div>
        )}

      <div className="p-3 border-t border-border flex gap-2">
        <Input
          placeholder="Ask me anything..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendText(input)}
          disabled={typing}
          className="text-sm"
        />
        <Button size="icon" onClick={() => sendText(input)} disabled={typing} className="flex-shrink-0">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
