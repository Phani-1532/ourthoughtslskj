import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const caseStudies = [
  {
    title: "40% Faster Hiring with HRMS",
    client: "Enterprise Client",
    metric: "40%",
    metricLabel: "Reduction in hiring time",
    description: "Implemented our HRMS platform to streamline the entire recruitment pipeline, from job posting to onboarding.",
  },
  {
    title: "E-Learning Platform Launch",
    client: "Education Institute",
    metric: "10K+",
    metricLabel: "Students onboarded",
    description: "Built a comprehensive e-learning ecosystem supporting live classes, course management, and student analytics.",
  },
  {
    title: "Hospital Management Digitization",
    client: "Healthcare Network",
    metric: "60%",
    metricLabel: "Operational efficiency gain",
    description: "Digitized end-to-end hospital operations including patient management, pharmacy, and facility scheduling.",
  },
];

export const CaseStudiesPreview = () => (
  <SectionWrapper>
    <SectionHeader
      badge="Case Studies"
      title="Real Impact, Real Results"
      subtitle="See how we've helped organizations transform their operations with measurable outcomes."
    />
    <div className="grid md:grid-cols-3 gap-8">
      {caseStudies.map((cs, i) => (
        <motion.div
          key={cs.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
        >
          <Card className="bg-gradient-card border-border/30 hover:border-primary/30 h-full group">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground font-body uppercase tracking-wider">{cs.client}</span>
              </div>
              <div className="text-4xl font-display font-bold text-gradient-gold mb-1">{cs.metric}</div>
              <p className="text-sm text-primary font-body mb-3">{cs.metricLabel}</p>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">{cs.title}</h3>
              <p className="text-sm text-muted-foreground font-body mb-4">{cs.description}</p>
              <Link to="/case-studies" className="text-sm text-primary font-body font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                Read full case study <ArrowRight className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
    <div className="text-center mt-10">
      <Button variant="outline" size="lg" asChild>
        <Link to="/case-studies">View All Case Studies</Link>
      </Button>
    </div>
  </SectionWrapper>
);
