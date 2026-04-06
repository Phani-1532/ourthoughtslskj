import { SectionWrapper } from "@/components/SectionWrapper";
import { motion } from "framer-motion";

const logos = [
  "TechCorp", "MediCare+", "EduStar", "GreenFarm", "HostelPro",
  "FinanceAI", "LegalEdge", "FoodHub",
];

export const ClientLogos = () => (
  <SectionWrapper className="py-10 md:py-14 border-y border-border">
    <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-8">
      Trusted by innovative organizations
    </p>
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
      {logos.map((name, i) => (
        <motion.div
          key={name}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="text-muted-foreground/25 font-bold text-xl md:text-2xl hover:text-primary/40 transition-colors cursor-default select-none"
        >
          {name}
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);
