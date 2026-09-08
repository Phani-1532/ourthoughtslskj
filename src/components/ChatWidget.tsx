import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User, ArrowRight, RotateCcw, Sparkles, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type ChatMessage = { role: "bot" | "user"; text: string };

const STORAGE_KEY = "ot-chat-session-v2";
const LEAD_KEY = "ot-chat-lead-v2";

const suggestions = ["What services do you offer?", "How much does a project cost?", "Can I book a demo?", "What industries do you serve?", "How long does a project take?"];

const initialMessage: ChatMessage = {
  role: "bot",
  text: "Hi! I'm the AI assistant for Our Thoughts LSKJ. Ask me about our services, products, pricing, timelines, or anything else!",
};

const getSessionId = (): string => {
  if (typeof window === "undefined") return "";
  let sid = localStorage.getItem(STORAGE_KEY);
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, sid);
  }
  return sid;
};

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(LEAD_KEY);
  });
  const [lead, setLead] = useState({ name: "", email: "" });
  const [error, setError] = useState(false);
  const [sessionId] = useState(getSessionId);
  const scrollRef = useRef<HTMLDivElement>(null);

  const userMsgCount = messages.filter(m => m.role === "user").length;
  const showLeadForm = !leadCaptured && userMsgCount >= 2;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open, showLeadForm]);

  const sendText = useCallback(async (text: string) => {
    if (!text.trim() || typing) return;
    setError(false);
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      };

      const conversationMessages = [...messages, { role: "user", text }].map(m => ({
        role: m.role === "bot" ? "assistant" : m.role,
        content: m.text,
      }));

      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({ messages: conversationMessages, sessionId }),
      });

      if (!response.ok) throw new Error(`Request failed (${response.status})`);

      const data = await response.json();
      if (!data.reply) throw new Error("No reply in response");

      setMessages(prev => [...prev, { role: "bot", text: data.reply }]);
    } catch {
      setError(true);
      setMessages(prev => [...prev, {
        role: "bot",
        text: "I'm having trouble connecting right now. Please try again, or reach us at info@ourthoughtslskj.com.",
      }]);
    } finally {
      setTyping(false);
    }
  }, [typing, messages, sessionId]);

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.name.trim() || !lead.email.trim()) return;

    try {
      await supabase.from("chat_leads").insert({
        session_id: sessionId,
        name: lead.name.trim(),
        email: lead.email.trim().toLowerCase(),
      });
    } catch {}

    try { localStorage.setItem(LEAD_KEY, JSON.stringify({ ...lead, at: Date.now() })); } catch {}
    setLeadCaptured(true);
    setMessages(prev => [...prev, {
      role: "bot",
      text: `Thanks ${lead.name.split(" ")[0]}! Our team will reach out at ${lead.email} shortly. Anything else I can help with?`,
    }]);
  };

  const resetChat = () => {
    setMessages([initialMessage]);
    setError(false);
    const newSid = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, newSid);
    window.location.reload();
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center shadow-elevated hover:shadow-glow transition-shadow"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-primary-foreground border-2 border-background" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-glass-strong border border-border rounded-2xl shadow-elevated overflow-hidden flex flex-col"
            style={{ maxHeight: "580px" }}
          >
            <div className="bg-gradient-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/15 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <span className="font-semibold text-primary-foreground text-sm block">AI Assistant</span>
                  <span className="text-[10px] text-primary-foreground/70 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/80 animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={resetChat} title="Clear chat" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button onClick={() => setOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "360px" }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "bot" && (
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div className="max-w-[78%]">
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
                  Connection issue — your messages are still saved.
                </div>
              )}

              {showLeadForm && !typing && (
                <form onSubmit={submitLead} className="bg-primary/5 border border-primary/20 rounded-2xl p-3.5 space-y-2.5">
                  <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    Want a tailored answer? Leave your details:
                  </p>
                  <Input
                    placeholder="Your name"
                    value={lead.name}
                    onChange={e => setLead({ ...lead, name: e.target.value })}
                    className="h-8 text-xs"
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={lead.email}
                    onChange={e => setLead({ ...lead, email: e.target.value })}
                    className="h-8 text-xs"
                  />
                  <div className="flex gap-2">
                    <Button type="submit" size="sm" className="h-7 text-xs flex-1">Send</Button>
                    <Button type="button" size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setLeadCaptured(true)}>Skip</Button>
                  </div>
                </form>
              )}
            </div>

            <div className="px-3 py-2 border-t border-border flex flex-wrap gap-1.5">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => sendText(s)}
                  disabled={typing}
                  className="text-xs px-2.5 py-1 rounded-full border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors disabled:opacity-50"
                >
                  {s}
                </button>
              ))}
            </div>

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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
