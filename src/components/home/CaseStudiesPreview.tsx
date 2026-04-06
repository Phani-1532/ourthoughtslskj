import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {caseStudies.map((cs, i) => (
        <motion.div
          key={cs.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="relative p-6 md:p-8 rounded-2xl border border-border hover:border-primary/30 h-full group hover:shadow-elevated transition-all duration-300 bg-background">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{cs.client}</span>
            </div>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-1">{cs.metric}</div>
            <p className="text-sm text-primary/80 mb-4">{cs.metricLabel}</p>
            <h3 className="text-base font-bold text-foreground mb-2">{cs.title}</h3>
            <p className="text-sm text-muted-foreground mb-5">{cs.description}</p>
            <Link to="/case-studies" className="text-sm text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
              Read full case study <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
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
