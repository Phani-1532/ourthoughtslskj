import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Check, RotateCcw, X } from "lucide-react";
import { INDUSTRIES, useIndustry } from "@/contexts/IndustryContext";

export const IndustrySwitcher = () => {
  const { industry, setIndustry, reset } = useIndustry();
  const [open, setOpen] = useState(false);
  const current = INDUSTRIES.find((i) => i.key === industry) || INDUSTRIES[0];

  return (
    <div className="fixed bottom-24 left-4 md:left-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 w-64 bg-background border border-border rounded-2xl shadow-elevated overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">View as</span>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto py-1">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind.key}
                  onClick={() => { setIndustry(ind.key); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-accent transition-colors ${
                    industry === ind.key ? "bg-primary/5" : ""
                  }`}
                >
                  <span className="text-lg">{ind.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{ind.label}</div>
                    <div className="text-xs text-muted-foreground truncate">{ind.tagline}</div>
                  </div>
                  {industry === ind.key && <Check className="w-4 h-4 text-primary shrink-0" />}
                </button>
              ))}
            </div>
            <button
              onClick={() => { reset(); setOpen(false); }}
              className="w-full flex items-center gap-2 px-4 py-3 text-xs text-muted-foreground hover:text-foreground hover:bg-accent border-t border-border"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to default home
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-full shadow-elevated hover:opacity-90 transition-all text-sm font-medium"
        title="Switch industry view"
      >
        <Layers className="w-4 h-4" />
        <span className="hidden sm:inline">{current.emoji} {current.label}</span>
        <span className="sm:hidden">{current.emoji}</span>
      </button>
    </div>
  );
};
