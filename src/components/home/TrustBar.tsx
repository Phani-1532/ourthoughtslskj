import { SectionWrapper } from "@/components/SectionWrapper";
import { ShieldCheck, Award, Lock, BadgeCheck, Globe, Star } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { icon: ShieldCheck, label: "ISO 27001", sub: "Information Security" },
  { icon: Award, label: "ISO 9001", sub: "Quality Management" },
  { icon: Lock, label: "GDPR Ready", sub: "Data Compliance" },
  { icon: BadgeCheck, label: "HIPAA Aligned", sub: "Healthcare Grade" },
  { icon: Globe, label: "20+ Countries", sub: "Global Delivery" },
  { icon: Star, label: "4.9/5 Rating", sub: "Verified Clients" },
];

export const TrustBar = () => (
  <SectionWrapper className="bg-card/30 py-12">
    <div className="text-center mb-8">
      <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Trusted & Certified</p>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">Enterprise-grade standards</h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {badges.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="flex flex-col items-center text-center gap-2 p-4 rounded-xl border border-border/60 bg-background/60 backdrop-blur-sm hover:border-primary/40 transition-colors"
        >
          <b.icon className="w-8 h-8 text-primary" />
          <div>
            <div className="text-sm font-semibold text-foreground">{b.label}</div>
            <div className="text-xs text-muted-foreground">{b.sub}</div>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);
