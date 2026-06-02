import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const rows = [
  { label: "Multi-domain expertise", us: true, them: false },
  { label: "Fixed-scope pricing", us: true, them: false },
  { label: "Senior engineers on every project", us: true, them: false },
  { label: "Weekly demos & transparent reporting", us: true, them: false },
  { label: "Outsourced juniors handling delivery", us: false, them: true },
  { label: "Hidden change-request fees", us: false, them: true },
  { label: "Long onboarding before value", us: false, them: true },
];

export const WhyUsComparison = () => (
  <SectionWrapper>
    <SectionHeader
      badge="Why Choose Us"
      title="The LSKJ Difference"
      subtitle="Side-by-side: what working with us looks like vs. traditional agencies."
    />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto bg-card border border-border rounded-2xl overflow-hidden"
    >
      <div className="grid grid-cols-3 bg-muted/50 text-sm font-semibold text-foreground">
        <div className="p-4">Capability</div>
        <div className="p-4 text-center text-primary">Our Thoughts LSKJ</div>
        <div className="p-4 text-center text-muted-foreground">Typical Agency</div>
      </div>
      {rows.map((r, i) => (
        <div
          key={r.label}
          className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
        >
          <div className="p-4 text-foreground">{r.label}</div>
          <div className="p-4 flex justify-center">
            {r.us ? <Check className="w-5 h-5 text-primary" /> : <X className="w-5 h-5 text-muted-foreground/40" />}
          </div>
          <div className="p-4 flex justify-center">
            {r.them ? <Check className="w-5 h-5 text-muted-foreground" /> : <X className="w-5 h-5 text-muted-foreground/40" />}
          </div>
        </div>
      ))}
    </motion.div>
  </SectionWrapper>
);
