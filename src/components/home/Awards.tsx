import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Award, Shield, Star, Trophy, BadgeCheck, Sparkles } from "lucide-react";
import awardsWall from "@/assets/awards-wall.png";

const awards = [
  { icon: Trophy, title: "Top B2B Innovator 2025", body: "Clutch Global Leaders" },
  { icon: Star, title: "4.9/5 Client Rating", body: "Across 50+ verified reviews" },
  { icon: Shield, title: "ISO 27001 Certified", body: "Information security" },
  { icon: BadgeCheck, title: "AWS Select Partner", body: "Certified cloud delivery" },
  { icon: Award, title: "Best EdTech Platform 2024", body: "EdTech Asia Awards" },
  { icon: Sparkles, title: "Great Place to Work", body: "Certified 2025" },
];

export const Awards = () => (
  <SectionWrapper className="bg-muted/30">
    <SectionHeader
      badge="Awards & Recognition"
      title="Recognized for Impact"
      subtitle="Trusted by industry leaders, certified by global standards."
    />
    <div className="max-w-5xl mx-auto mb-8 overflow-hidden border border-border bg-background shadow-card">
      <img src={awardsWall} alt="Our Thoughts LSKJ awards and certifications" loading="lazy" className="w-full h-auto" />
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {awards.map((a, i) => (
        <motion.div
          key={a.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="bg-card border border-border rounded-2xl p-5 text-center hover:border-primary/30 transition"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <a.icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-sm font-bold text-foreground mb-1">{a.title}</h3>
          <p className="text-xs text-muted-foreground">{a.body}</p>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);
