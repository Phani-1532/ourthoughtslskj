import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, X, Send, Bot, User, ArrowRight, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

type ChatMessage = { role: "bot" | "user"; text: string };

const STORAGE_KEY = "ot-scroll-ai-shown";

const QUESTIONS = [
  {
    id: "intent",
    question: "What are you looking for today?",
    options: [
      { label: "Web & App Development", value: "I need a website or app built" },
      { label: "AI / Digital Transformation", value: "I want to digitize or automate my business" },
      { label: "HRMS / Product Demo", value: "I want to see your products like HRMS" },
      { label: "Just Exploring", value: "I'm just browsing and exploring" },
    ],
  },
  {
    id: "industry",
    question: "Which industry best describes your business?",
    options: [
      { label: "Healthcare", value: "Healthcare" },
      { label: "E-Commerce / Retail", value: "E-Commerce" },
      { label: "Hospitality", value: "Hospitality" },
      { label: "IT / Technology", value: "IT & Technology" },
      { label: "Education", value: "Education" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    id: "timeline",
    question: "When are you looking to get started?",
    options: [
      { label: "Immediately", value: "Immediately" },
      { label: "1-3 Months", value: "1-3 Months" },
      { label: "Just Exploring", value: "Just exploring" },
    ],
  },
];

const buildContextFromAnswers = (answers: Record<string, string>): string => {
  const intent = answers["intent"] || "";
  const industry = answers["industry"] || "";
  const timeline = answers["timeline"] || "";
  return `The visitor answered a quick survey: They are looking for: "${intent}". Their industry is: "${industry}". Their timeline is: "${timeline}". Use this context to give personalized answers. Be concise and friendly.`;
};

export const ScrollAIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<"survey" | "chat">("survey");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll detection: trigger after 2 down-scrolls and 1 up-scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let downCount = 0;
    let upCount = 0;
    let lastY = window.scrollY;
    let armed = false;

    const handler = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < 50) return;
      lastY = y;

      if (delta > 0) {
        downCount++;
        if (downCount >= 2) armed = true;
      } else if (delta < 0) {
        if (armed) {
          upCount++;
          if (upCount >= 1) {
            setOpen(true);
            sessionStorage.setItem(STORAGE_KEY, "1");
            window.removeEventListener("scroll", handler);
          }
        }
      }
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      // Survey complete — transition to chat
      setPhase("chat");
      const context = buildContextFromAnswers(newAnswers);
      setMessages([{
        role: "bot",
        text: getInitialMessage(newAnswers),
      }]);
      // Store context for first AI call
      (window as any).__otScrollAIContext = context;
    }
  };

  const getInitialMessage = (ans: Record<string, string>): string => {
    const intent = ans["intent"] || "";
    if (intent.includes("website") || intent.includes("app")) {
      return "Great! I can help you find the right web or app development service. What kind of project are you envisioning?";
    }
    if (intent.includes("digitize") || intent.includes("automate")) {
      return "Awesome! We specialize in digital transformation. What process or area of your business do you want to improve first?";
    }
    if (intent.includes("products") || intent.includes("HRMS") || intent.includes("demo")) {
      return "I'd love to help you explore our products! Would you like to know about the HRMS, E-Learning platform, or Healthcare platform?";
    }
    return "Thanks for sharing! Feel free to ask me anything about our services, products, or how we can help your business.";
  };

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

      const contextMsg = (window as any).__otScrollAIContext
        ? { role: "system", content: (window as any).__otScrollAIContext }
        : null;

      const conversationMessages = [
        ...(contextMsg ? [contextMsg] : []),
        ...messages.map(m => ({
          role: m.role === "bot" ? "assistant" : m.role,
          content: m.text,
        })),
        { role: "user", content: text },
      ];

      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({ messages: conversationMessages, sessionId: "scroll-assistant" }),
      });

      if (!response.ok) throw new Error(`Request failed (${response.status})`);

      const data = await response.json();
      if (!data.reply) throw new Error("No reply in response");

      setMessages(prev => [...prev, { role: "bot", text: data.reply }]);
    } catch {
      setError(true);
      setMessages(prev => [...prev, {
        role: "bot",
        text: "I'm having trouble connecting right now. Please try again or reach us at info@ourthoughtslskj.com.",
      }]);
    } finally {
      setTyping(false);
    }
  }, [typing, messages]);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  };

  const q = QUESTIONS[currentQ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-md bg-card border border-border rounded-2xl shadow-elevated overflow-hidden flex flex-col"
            style={{ maxHeight: "min(600px, 85vh)" }}
          >
            {/* Header */}
            <div className="bg-gradient-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-primary-foreground/15 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="font-semibold text-primary-foreground text-sm block">AI Assistant</span>
                  <span className="text-[10px] text-primary-foreground/70 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/80 animate-pulse" />
                    {phase === "survey" ? "Quick questions" : "Here to help"}
                  </span>
                </div>
              </div>
              <button onClick={close} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {phase === "survey" ? (
              /* Survey Phase */
              <div className="p-5 sm:p-6 flex-1 overflow-y-auto">
                {/* Progress dots */}
                <div className="flex gap-2 mb-6">
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentQ ? "w-8 bg-primary" : i < currentQ ? "w-4 bg-primary/50" : "w-4 bg-border"
                      }`}
                    />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQ}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex gap-2.5 mb-5">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3">
                        <p className="text-sm text-foreground font-medium">{q.question}</p>
                      </div>
                    </div>

                    <div className="space-y-2.5 pl-10">
                      {q.options.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => handleAnswer(q.id, opt.value)}
                          className="w-full text-left px-4 py-3 rounded-xl border border-border bg-background hover:border-primary hover:bg-primary/5 transition-all duration-200 group flex items-center justify-between"
                        >
                          <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                            {opt.label}
                          </span>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {currentQ > 0 && (
                  <button
                    onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors mt-4"
                  >
                    Back
                  </button>
                )}
              </div>
            ) : (
              /* Chat Phase */
              <>
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3" style={{ maxHeight: "min(380px, 55vh)" }}>
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

                <div className="p-3 border-t border-border flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendText(input)}
                    disabled={typing}
                    className="flex-1 h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  />
                  <Button size="icon" onClick={() => sendText(input)} disabled={typing} className="flex-shrink-0">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                <div className="px-3 pb-3 flex justify-center">
                  <Link to="/contact" onClick={close} className="text-xs text-primary hover:underline">
                    Or contact us directly
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
