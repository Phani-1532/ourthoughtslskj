import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User, ArrowRight } from "lucide-react";

type BotReply = {
  text: string;
  link?: { label: string; to: string };
};

const knowledge: { keywords: string[]; reply: BotReply }[] = [
  {
    keywords: ["service", "what we serve", "offer", "offering"],
    reply: {
      text: "We offer E-Commerce, Web Design, HRMS, Healthcare Management, Hospitality, IT Consulting and BPM solutions.",
      link: { label: "View Services", to: "/services" },
    },
  },
  {
    keywords: ["product", "hrms", "e-learning", "elearning", "app"],
    reply: {
      text: "Our products include HRMS (Beta), E-Learning Platform, Healthcare Apps, and upcoming apps like E-Kirana & Smart Farming.",
      link: { label: "Explore Products", to: "/products" },
    },
  },
  {
    keywords: ["industry", "industries", "sector", "domain"],
    reply: {
      text: "We serve Healthcare, Hospitality, Education, IT, Retail, and more industries.",
      link: { label: "See Industries", to: "/industries" },
    },
  },
  {
    keywords: ["case stud", "portfolio", "client work", "project"],
    reply: {
      text: "Check out real client success stories with measurable results.",
      link: { label: "View Case Studies", to: "/case-studies" },
    },
  },
  {
    keywords: ["why", "choose", "trust", "different"],
    reply: {
      text: "Multi-domain expertise, proven results, and a dedicated team make us stand out.",
      link: { label: "Why Choose Us", to: "/why-choose-us" },
    },
  },
  {
    keywords: ["blog", "insight", "article", "news"],
    reply: {
      text: "Read our latest insights, trends, and industry articles.",
      link: { label: "Read Blog", to: "/blog" },
    },
  },
  {
    keywords: ["career", "job", "hiring", "vacancy", "work with"],
    reply: {
      text: "We're hiring across Engineering, Design, Marketing and more!",
      link: { label: "View Openings", to: "/careers" },
    },
  },
  {
    keywords: ["about", "company", "who are you", "team"],
    reply: {
      text: "Our Thoughts LSKJ is a multi-domain innovation company delivering digital solutions across industries.",
      link: { label: "About Us", to: "/about" },
    },
  },
  {
    keywords: ["contact", "reach", "email", "phone", "call", "support"],
    reply: {
      text: "Reach us at info@ourthoughtslskj.com or +91 98765 43210.",
      link: { label: "Contact Us", to: "/contact" },
    },
  },
  {
    keywords: ["demo", "book", "schedule", "meeting", "consult"],
    reply: {
      text: "Book a free demo or consultation — we'd love to show you what we can do.",
      link: { label: "Book Demo", to: "/contact" },
    },
  },
  {
    keywords: ["price", "pricing", "cost", "quote", "budget"],
    reply: {
      text: "Pricing depends on your project scope. Get a free custom quote.",
      link: { label: "Get a Quote", to: "/contact" },
    },
  },
  {
    keywords: ["healthcare", "hospital", "medical", "clinic"],
    reply: {
      text: "Our healthcare solutions include hospital management, patient apps and telemedicine platforms.",
      link: { label: "Healthcare Solutions", to: "/industries" },
    },
  },
  {
    keywords: ["learn", "course", "training", "education", "student"],
    reply: {
      text: "Our E-Learning platform offers courses, live classes and certifications.",
      link: { label: "Explore E-Learning", to: "/e-learning" },
    },
  },
];

const greetings = ["hello", "hi", "hey", "good morning", "good evening", "namaste"];

const findReply = (msg: string): BotReply => {
  const lower = ` ${msg.toLowerCase()} `;
  // greetings only if message is short
  if (msg.trim().split(/\s+/).length <= 2 && greetings.some(g => lower.includes(` ${g} `) || lower.trim() === g)) {
    return { text: "Hi there! 👋 How can I help — services, products, pricing, or a demo?" };
  }
  for (const entry of knowledge) {
    if (entry.keywords.some(k => lower.includes(k))) return entry.reply;
  }
  return {
    text: "I'm not sure about that yet. You can browse our services or contact our team for a detailed answer.",
    link: { label: "Contact Us", to: "/contact" },
  };
};

const suggestions = ["Services", "Products", "Book Demo", "Pricing", "Careers"];

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string; link?: BotReply["link"] }[]>([
    { role: "bot", text: "Hi! 👋 I'm the Our Thoughts LSKJ assistant. Ask me about our services, products, or get started!" },
  ]);
  const [input, setInput] = useState("");

  const sendText = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      const reply = findReply(text);
      setMessages(prev => [...prev, { role: "bot", text: reply.text, link: reply.link }]);
    }, 500);
  };

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
            style={{ maxHeight: "540px" }}
          >
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary-foreground" />
                <span className="font-semibold text-primary-foreground text-sm">OT Assistant</span>
              </div>
              <button onClick={() => setOpen(false)}><X className="w-5 h-5 text-primary-foreground" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "340px" }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "bot" && <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"><Bot className="w-4 h-4 text-primary" /></div>}
                  <div className={`max-w-[75%] space-y-2`}>
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
                  </div>
                  {msg.role === "user" && <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"><User className="w-4 h-4 text-primary" /></div>}
                </div>
              ))}
            </div>

            <div className="px-3 py-2 border-t border-border flex flex-wrap gap-1">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => sendText(s)}
                  className="text-xs px-2 py-1 rounded-full border border-border hover:bg-accent transition-colors"
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
                className="text-sm"
              />
              <Button size="icon" onClick={() => sendText(input)}><Send className="w-4 h-4" /></Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
