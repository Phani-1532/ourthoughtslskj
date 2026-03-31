import { SectionWrapper } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket } from "lucide-react";

export const CTABlock = () => (
  <SectionWrapper>
    <div className="relative rounded-2xl overflow-hidden bg-primary p-10 md:p-16 text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
          <Rocket className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Ready to Transform Your Business?
        </h2>
        <p className="text-base text-primary-foreground/80 mb-8 max-w-xl mx-auto">
          Let's discuss how our solutions can drive measurable growth for your organization. Free consultation, no commitments.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" size="lg" asChild>
            <Link to="/contact">
              Get a Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
            <Link to="/case-studies">See Our Work</Link>
          </Button>
        </div>
      </div>
    </div>
  </SectionWrapper>
);
