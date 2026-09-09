import { SectionWrapper } from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const quotes = [
  {
    text: "You will face many defeats in life, but never let yourself be defeated.",
    author: "Maya Angelou",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Abraham Lincoln",
  },
];

export const InspirationalQuotes = () => (
  <SectionWrapper className="bg-card/30 relative overflow-hidden">
    <div className="glow-orb w-[500px] h-[500px] bg-primary/4 top-[-20%] left-[10%] animate-float-slow" />
    <div className="glow-orb w-[400px] h-[400px] bg-primary/3 bottom-[-20%] right-[10%] animate-float" />

    <div className="text-center mb-10 md:mb-14 relative z-10">
      <span className="editorial-kicker mb-5">Quotes for Life</span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight text-balance">
        Words That Inspire Us
      </h2>
      <div className="flex items-center justify-center gap-1.5 mt-6">
        <span className="h-1 w-1 rounded-full bg-primary/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
        <span className="h-2 w-2 rounded-full bg-primary shadow-glow" />
        <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
        <span className="h-1 w-1 rounded-full bg-primary/30" />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
      {quotes.map((q, i) => (
        <motion.div
          key={q.author}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="relative bg-background border border-border rounded-2xl p-7 md:p-8 hover:border-primary/20 hover:shadow-elevated transition-all duration-300 group overflow-hidden"
        >
          <div className="absolute top-5 right-6 w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
            <Quote className="w-6 h-6 text-primary/30 group-hover:text-primary/50 transition-colors" />
          </div>
          <p className="text-foreground italic leading-relaxed text-base md:text-lg pr-14 mb-5">
            "{q.text}"
          </p>
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <div className="h-px w-8 bg-gradient-primary" />
            <p className="text-sm font-semibold text-primary">{q.author}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);
