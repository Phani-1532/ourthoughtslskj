import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

const faqs: Record<string, string> = {
  "services": "We offer E-Commerce, Web Design, HRMS, Healthcare Management, Hospitality, and more. Visit our Services page for details!",
  "products": "Our products include HRMS (Beta), E-Learning Platform, Healthcare Apps, and upcoming apps like E-Kirana and Smart Farming.",
  "demo": "You can get started through our Contact page or click the 'Get Started' button!",
  "pricing": "Pricing depends on your project scope. Contact us for a free consultation and custom quote.",
  "careers": "We're hiring! Check our Careers page for current openings across Engineering, Design, Marketing, and more.",
  "contact": "Reach us at info@ourthoughtslskj.com or call +91 98765 43210. You can also WhatsApp us!",
  "hello": "Hello! 👋 I'm the Our Thoughts LSKJ assistant. How can I help you today?",
  "hi": "Hi there! 👋 How can I assist you today?",
};

const findAnswer = (msg: string): string => {
  const lower = msg.toLowerCase();
  for (const [key, val] of Object.entries(faqs)) {
    if (lower.includes(key)) return val;
  }
  return "Thanks for your message! For detailed assistance, please reach out via our Contact page or email info@ourthoughtslskj.com.";
};

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    { role: "bot", text: "Hi! 👋 I'm the Our Thoughts LSKJ assistant. Ask me about our services, products, or get started!" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "bot", text: findAnswer(userMsg) }]);
    }, 600);
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
            style={{ maxHeight: "500px" }}
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
                  <div className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${
                    msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}>{msg.text}</div>
                  {msg.role === "user" && <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"><User className="w-4 h-4 text-primary" /></div>}
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-border flex gap-2">
              <Input
                placeholder="Ask me anything..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                className="text-sm"
              />
              <Button size="icon" onClick={send}><Send className="w-4 h-4" /></Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
