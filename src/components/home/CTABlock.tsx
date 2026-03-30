import { SectionWrapper } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket } from "lucide-react";

export const CTABlock = () => (
  <SectionWrapper>
    <div className="relative rounded-2xl overflow-hidden bg-gradient-card border border-border/30 p-10 md:p-16 text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Rocket className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          Ready to Transform Your Business?
        </h2>
        <p className="text-lg text-muted-foreground font-body mb-8 max-w-xl mx-auto">
          Let's discuss how our solutions can drive measurable growth for your organization. Free consultation, no commitments.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button variant="outline" size="xl" asChild>
            <Link to="/case-studies">See Our Work</Link>
          </Button>
        </div>
      </div>
    </div>
  </SectionWrapper>
);
