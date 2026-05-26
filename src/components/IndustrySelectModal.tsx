import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { INDUSTRIES, IndustryKey, useIndustry } from "@/contexts/IndustryContext";
import { motion } from "framer-motion";

export const IndustrySelectModal = () => {
  const { asked, setIndustry, markAsked } = useIndustry();

  const choose = (k: IndustryKey) => {
    setIndustry(k);
    markAsked();
  };

  return (
    <Dialog open={!asked} onOpenChange={(o) => { if (!o) markAsked(); }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Which industry are you exploring?</DialogTitle>
          <DialogDescription>
            Pick an industry to personalize this page. You can change or reset it anytime.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {INDUSTRIES.map((ind, i) => (
            <motion.button
              key={ind.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => choose(ind.key)}
              className="text-left p-4 rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="text-2xl mb-2">{ind.emoji}</div>
              <div className="text-sm font-semibold text-foreground group-hover:text-primary">{ind.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{ind.tagline}</div>
            </motion.button>
          ))}
        </div>
        <div className="flex justify-end mt-2">
          <Button variant="ghost" size="sm" onClick={() => choose("default")}>
            Skip — show me everything
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
