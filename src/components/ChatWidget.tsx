import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User, ArrowRight, RotateCcw } from "lucide-react";

type NavLink = { label: string; to: string };
type BotReply = { text: string; link?: NavLink; links?: NavLink[] };
type ChatMessage = { role: "bot" | "user"; text: string; link?: NavLink; links?: NavLink[] };

const STORAGE_KEY = "ot-chat-history-v1";

const knowledge: { keywords: string[]; reply: BotReply }[] = [
  { keywords: ["service", "what we serve", "offer", "offering", "solution"],
    reply: { text: "We offer E-Commerce, Web Design, HRMS, Healthcare Management, Hospitality, IT Consulting and BPM solutions.", link: { label: "View Services", to: "/services" } } },
  { keywords: ["product", "hrms", "e-learning", "elearning", "app", "platform"],
    reply: { text: "Our products include HRMS (Beta), E-Learning Platform, Healthcare Apps, and upcoming apps like E-Kirana & Smart Farming.", link: { label: "Explore Products", to: "/products" } } },
  { keywords: ["industry", "industries", "sector", "domain"],
    reply: { text: "We serve Healthcare, Hospitality, Education, IT, Retail, and more industries.", link: { label: "See Industries", to: "/industries" } } },
  { keywords: ["case stud", "portfolio", "client work", "success stor"],
    reply: { text: "Check out real client success stories with measurable results.", link: { label: "View Case Studies", to: "/case-studies" } } },
  { keywords: ["why", "choose", "trust", "different", "stand out"],
    reply: { text: "Multi-domain expertise, proven results, and a dedicated team make us stand out.", link: { label: "Why Choose Us", to: "/why-choose-us" } } },
  { keywords: ["blog", "insight", "article", "news"],
    reply: { text: "Read our latest insights, trends, and industry articles.", link: { label: "Read Blog", to: "/blog" } } },
  { keywords: ["career", "job", "hiring", "vacancy", "work with", "internship", "apply"],
    reply: { text: "We're hiring across Engineering, Design, Marketing and more!", link: { label: "View Openings", to: "/careers" } } },
  { keywords: ["about", "company", "who are you", "team", "founder", "story", "mission", "vision"],
    reply: { text: "Our Thoughts LSKJ is a multi-domain innovation company delivering digital solutions across industries.", link: { label: "About Us", to: "/about" } } },
  { keywords: ["contact", "reach", "email", "phone", "call", "whatsapp", "message us"],
    reply: { text: "Reach us at info@ourthoughtslskj.com or +91 98765 43210.", link: { label: "Contact Us", to: "/contact" } } },
  { keywords: ["support", "help", "assist", "customer care", "service desk"],
    reply: { text: "We provide dedicated support over email, phone and WhatsApp — typical response within a few hours on business days.",
      links: [{ label: "Contact Support", to: "/contact" }, { label: "FAQs / Blog", to: "/blog" }] } },
  { keywords: ["location", "office", "address", "where", "based", "headquarter", "hq", "branch"],
    reply: { text: "Our HQ is in India and we serve clients globally. Drop us a message and we'll share the closest office.", link: { label: "Find Us", to: "/contact" } } },
  { keywords: ["timeline", "how long", "duration", "delivery time", "turnaround", "deadline", "when can", "time frame"],
    reply: { text: "Typical timelines: MVP 4–6 weeks, full product 2–4 months. Exact timeline depends on scope — let's discuss yours.",
      links: [{ label: "Discuss Timeline", to: "/contact" }, { label: "See Case Studies", to: "/case-studies" }] } },
  { keywords: ["demo", "book", "schedule", "meeting", "consult", "trial"],
    reply: { text: "Book a free demo or consultation — we'd love to show you what we can do.", link: { label: "Book Demo", to: "/contact" } } },
  { keywords: ["price", "pricing", "cost", "quote", "budget", "rate", "charge"],
    reply: { text: "Pricing depends on your project scope. Get a free custom quote.", link: { label: "Get a Quote", to: "/contact" } } },
  { keywords: ["healthcare", "hospital", "medical", "clinic", "patient", "telemedicine"],
    reply: { text: "Our healthcare solutions include hospital management, patient apps and telemedicine platforms.", link: { label: "Healthcare Solutions", to: "/industries" } } },
  { keywords: ["learn", "course", "training", "education", "student", "lms"],
    reply: { text: "Our E-Learning platform offers courses, live classes and certifications.", link: { label: "Explore E-Learning", to: "/e-learning" } } },
  { keywords: ["technology", "tech stack", "stack", "framework", "language"],
    reply: { text: "We build with modern stacks: React, Next.js, Node, Python, cloud-native infra and AI/ML where it fits.", link: { label: "Why Choose Us", to: "/why-choose-us" } } },
  { keywords: ["partner", "collaborate", "partnership"],
    reply: { text: "We're open to strategic partnerships across industries.", link: { label: "Partner With Us", to: "/contact" } } },
];

const greetings = ["hello", "hi", "hey", "good morning", "good evening", "namaste", "yo"];

const fallbackLinks: NavLink[] = [
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Industries", to: "/industries" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Book Demo", to: "/contact" },
];

const findReply = (msg: string): BotReply => {
  const lower = ` ${msg.toLowerCase()} `;
  const wordCount = msg.trim().split(/\s+/).length;
  if (wordCount <= 2 && greetings.some(g => lower.includes(` ${g} `) || lower.trim() === g)) {
    return { text: "Hi there! 👋 How can I help — services, products, pricing, support, or a demo?" };
  }
  for (const entry of knowledge) {
    if (entry.keywords.some(k => lower.includes(k))) return entry.reply;
  }
  return {
    text: "I'm not sure I caught that. Here are some helpful places to start — or ask me about services, pricing, support, locations, or timelines.",
    links: fallbackLinks,
  };
};

const suggestions = ["Services", "Products", "Pricing", "Support", "Timeline", "Book Demo"];

const initialMessage: ChatMessage = {
  role: "bot",
  text: "Hi! 👋 I'm the Our Thoughts LSKJ assistant. Ask me about our services, products, pricing, support, or get started!",
};

const loadHistory = (): ChatMessage[] => {
  if (typeof window === "undefined") return [initialMessage];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [initialMessage];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [initialMessage];
  } catch {
    return [initialMessage];
  }
};

const LEAD_KEY = "ot-chat-lead-v1";

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(LEAD_KEY);
  });
  const [lead, setLead] = useState({ name: "", email: "" });
  const scrollRef = useRef<HTMLDivElement>(null);

  const userMsgCount = messages.filter(m => m.role === "user").length;
  const showLeadForm = !leadCaptured && userMsgCount >= 2;

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch {}
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open, showLeadForm]);

  const sendText = (text: string) => {
    if (!text.trim() || typing) return;
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = findReply(text);
      setMessages(prev => [...prev, { role: "bot", text: reply.text, link: reply.link, links: reply.links }]);
      setTyping(false);
    }, 900);
  };

  const submitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.name.trim() || !lead.email.trim()) return;
    try { localStorage.setItem(LEAD_KEY, JSON.stringify({ ...lead, at: Date.now() })); } catch {}
    setLeadCaptured(true);
    setMessages(prev => [...prev, {
      role: "bot",
      text: `Thanks ${lead.name.split(" ")[0]}! Our team will reach out at ${lead.email} shortly. Anything else I can help with?`,
    }]);
  };

  const resetChat = () => { setMessages([initialMessage]); };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-elevated hover:scale-110 transition-transform"
          >
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-background border border-border rounded-2xl shadow-elevated overflow-hidden flex flex-col"
            style={{ maxHeight: "560px" }}
          >
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary-foreground" />
                <span className="font-semibold text-primary-foreground text-sm">OT Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={resetChat} title="Clear chat">
                  <RotateCcw className="w-4 h-4 text-primary-foreground/80 hover:text-primary-foreground" />
                </button>
                <button onClick={() => setOpen(false)}>
                  <X className="w-5 h-5 text-primary-foreground" />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "340px" }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div className="max-w-[78%] space-y-2">
                    <div className={`px-3 py-2 rounded-xl text-sm ${
                      msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}>{msg.text}</div>
                    {msg.link && (
                      <Link to={msg.link.to} onClick={() => setOpen(false)}>
                        <Button size="sm" variant="outline" className="gap-1 h-7 text-xs">
                          {msg.link.label} <ArrowRight className="w-3 h-3" />
                        </Button>
                      </Link>
                    )}
                    {msg.links && (
                      <div className="flex flex-wrap gap-1.5">
                        {msg.links.map(l => (
                          <Link key={l.to + l.label} to={l.to} onClick={() => setOpen(false)}>
                            <Button size="sm" variant="outline" className="gap-1 h-7 text-xs">
                              {l.label} <ArrowRight className="w-3 h-3" />
                            </Button>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}

              {typing && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted px-3 py-2.5 rounded-xl flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            <div className="px-3 py-2 border-t border-border flex flex-wrap gap-1">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => sendText(s)}
                  disabled={typing}
                  className="text-xs px-2 py-1 rounded-full border border-border hover:bg-accent transition-colors disabled:opacity-50"
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
              <Button size="icon" onClick={() => sendText(input)} disabled={typing}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
