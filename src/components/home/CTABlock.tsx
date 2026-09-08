import { SectionWrapper } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket } from "lucide-react";
import { useIndustry } from "@/contexts/IndustryContext";
import { getIndustryContent } from "@/lib/industryContent";

export const CTABlock = () => {
  const { industry } = useIndustry();
  const c = getIndustryContent(industry)?.cta;
  return (
  <SectionWrapper>
    <div className="relative rounded-3xl overflow-hidden bg-gradient-primary p-10 md:p-20 text-center shadow-glow">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-foreground/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary-foreground/5 blur-3xl" />
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
          <Rocket className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4 tracking-tight">
          {c?.title || "Ready to Transform Your Business?"}
        </h2>
        <p className="text-base md:text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto leading-relaxed">
          {c?.subtitle || "Let's discuss how our solutions can drive measurable growth for your organization. Free consultation, no commitments."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" size="lg" className="text-base px-8" asChild>
            <Link to="/contact">
              Get a Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8" asChild>
            <Link to="/case-studies">See Our Work</Link>
          </Button>
        </div>
      </div>
    </div>
  </SectionWrapper>
  );
};
