import { SectionWrapper } from "@/components/SectionWrapper";
import { motion } from "framer-motion";

const logos = [
  "TechCorp", "MediCare+", "EduStar", "GreenFarm", "HostelPro",
  "FinanceAI", "LegalEdge", "FoodHub",
];

export const ClientLogos = () => (
  <SectionWrapper className="py-12 md:py-16 border-y border-border/30">
    <p className="text-center text-xs uppercase tracking-widest text-muted-foreground font-body mb-8">
      Trusted by innovative organizations
    </p>
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
      {logos.map((name, i) => (
        <motion.div
          key={name}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="text-muted-foreground/40 font-display font-bold text-xl hover:text-primary/60 transition-colors cursor-default"
        >
          {name}
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);
