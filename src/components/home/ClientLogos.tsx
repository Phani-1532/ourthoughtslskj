import { SectionWrapper } from "@/components/SectionWrapper";
import { motion } from "framer-motion";

const logos = [
  "TechCorp", "MediCare+", "EduStar", "GreenFarm", "HostelPro",
  "FinanceAI", "LegalEdge", "FoodHub",
];

export const ClientLogos = () => (
  <SectionWrapper className="py-10 md:py-14 border-y border-border">
    <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
      Trusted by innovative organizations
    </p>
    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 lg:gap-16">
      {logos.map((name, i) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          whileHover={{ y: -3 }}
          className="text-muted-foreground/30 font-bold text-xl md:text-2xl hover:text-primary/60 transition-colors duration-300 cursor-default select-none"
        >
          {name}
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);
