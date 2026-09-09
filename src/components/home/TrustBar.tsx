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
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2 tracking-tight">Enterprise-grade standards</h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {badges.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ y: -4 }}
          className="flex flex-col items-center text-center gap-2.5 p-5 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/40 hover:bg-primary/5 hover:shadow-glow transition-all duration-300 group"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
            <b.icon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">{b.label}</div>
            <div className="text-xs text-muted-foreground">{b.sub}</div>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);
