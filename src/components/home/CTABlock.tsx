import { SectionWrapper } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useIndustry } from "@/contexts/IndustryContext";
import { getIndustryContent } from "@/lib/industryContent";

export const CTABlock = () => {
  const { industry } = useIndustry();
  const c = getIndustryContent(industry)?.cta;
  return (
  <SectionWrapper>
    <div className="relative rounded-3xl overflow-hidden bg-gradient-primary p-10 md:p-20 text-center shadow-glow-lg animate-gradient-shift">
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-cta-mesh opacity-80" />

      {/* Floating decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-foreground/8 blur-3xl animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary-foreground/8 blur-3xl animate-float" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-primary-foreground/5 blur-3xl animate-glow" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20 radial-fade" />

      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 20 }}
          className="w-16 h-16 rounded-2xl bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
        >
          <Rocket className="w-8 h-8 text-primary-foreground" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4 tracking-tight text-balance"
        >
          {c?.title || "Ready to Transform Your Business?"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          {c?.subtitle || "Let's discuss how our solutions can drive measurable growth for your organization. Free consultation, no commitments."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="secondary" size="lg" className="text-base px-8 group" asChild>
            <Link to="/contact">
              Get a Free Consultation
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8" asChild>
            <Link to="/case-studies">See Our Work</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  </SectionWrapper>
  );
};
