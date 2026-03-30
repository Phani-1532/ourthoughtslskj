import { Layout } from "@/components/Layout";
import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, ArrowRight, BarChart3, Clock, Users, CheckCircle } from "lucide-react";

const caseStudies = [
  {
    id: "hrms-hiring",
    title: "40% Faster Hiring with HRMS",
    client: "Enterprise Client",
    industry: "HR & Finance",
    metrics: { before: "15 days avg hiring cycle", after: "9 days avg hiring cycle" },
    mainMetric: "40%",
    mainMetricLabel: "Reduction in hiring time",
    problem: "The client's HR department was overwhelmed with manual processes — screening resumes, scheduling interviews, and tracking candidates across spreadsheets. The average hiring cycle was 15 days, causing talent loss to competitors.",
    solution: "We deployed our HRMS platform with automated applicant tracking, AI-powered resume screening, interview scheduling, and onboarding workflows. The system integrated with existing payroll and attendance systems.",
    results: ["Hiring cycle reduced from 15 to 9 days", "90% reduction in manual data entry", "Employee satisfaction increased by 35%", "Onboarding time cut by 50%"],
  },
  {
    id: "elearning-launch",
    title: "E-Learning Platform for 10K+ Students",
    client: "Education Institute",
    industry: "E-Learning",
    metrics: { before: "500 students, offline only", after: "10,000+ students, fully digital" },
    mainMetric: "10K+",
    mainMetricLabel: "Students onboarded in 6 months",
    problem: "A traditional education institute was limited to physical classrooms with capacity for only 500 students. They had no digital infrastructure for remote learning or content delivery.",
    solution: "We built a comprehensive e-learning platform with live video classes, recorded lectures, interactive quizzes, assignment management, and student progress analytics. The platform supports multi-device access.",
    results: ["10,000+ students onboarded in 6 months", "Course completion rate of 85%", "Revenue increased 400% from new student enrollment", "95% student satisfaction rate"],
  },
  {
    id: "hospital-digitization",
    title: "Hospital Network Digitization",
    client: "Healthcare Network",
    industry: "Healthcare",
    metrics: { before: "Manual records, 30-min avg wait", after: "Digital records, 12-min avg wait" },
    mainMetric: "60%",
    mainMetricLabel: "Operational efficiency gain",
    problem: "A network of hospitals relied on paper records and manual scheduling, leading to long patient wait times, billing errors, and difficulty tracking patient history across facilities.",
    solution: "We implemented our healthcare platform covering electronic health records, appointment scheduling, pharmacy management, and cross-facility patient data synchronization.",
    results: ["Patient wait time reduced from 30 to 12 minutes", "Billing errors decreased by 85%", "Cross-facility patient lookup in seconds", "Staff productivity increased by 60%"],
  },
  {
    id: "ecommerce-ops",
    title: "E-Commerce Operations Overhaul",
    client: "Retail Brand",
    industry: "E-Commerce",
    metrics: { before: "Manual order processing", after: "Fully automated pipeline" },
    mainMetric: "3x",
    mainMetricLabel: "Order processing speed increase",
    problem: "A growing retail brand was processing orders manually, leading to delays, inventory mismatches, and customer complaints.",
    solution: "We built an integrated e-commerce operations platform with automated order processing, real-time inventory sync, and multi-channel management.",
    results: ["Order processing speed increased 3x", "Inventory accuracy improved to 99.5%", "Customer complaints reduced by 70%", "Revenue grew 45% in first quarter"],
  },
];

const CaseStudies = () => (
  <Layout>
    <div className="pt-24">
      <SectionWrapper>
        <SectionHeader
          badge="Case Studies"
          title="Real Impact, Proven Results"
          subtitle="See how our solutions have transformed businesses across industries with measurable outcomes."
        />

        <div className="space-y-16">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-card border border-border/30 rounded-2xl overflow-hidden"
            >
              <div className="p-8 md:p-10">
                {/* Header */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full border border-primary/20 font-body">
                    {cs.industry}
                  </span>
                  <span className="text-xs text-muted-foreground font-body">{cs.client}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">{cs.title}</h3>

                {/* Main metric */}
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border/30">
                  <div className="text-5xl font-display font-bold text-gradient-gold">{cs.mainMetric}</div>
                  <div>
                    <p className="text-primary font-body font-medium">{cs.mainMetricLabel}</p>
                    <div className="flex gap-6 mt-2 text-sm text-muted-foreground font-body">
                      <span>Before: {cs.metrics.before}</span>
                      <span>After: {cs.metrics.after}</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-destructive" /> Problem
                    </h4>
                    <p className="text-sm text-muted-foreground font-body">{cs.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" /> Solution
                    </h4>
                    <p className="text-sm text-muted-foreground font-body">{cs.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" /> Results
                    </h4>
                    <ul className="space-y-2">
                      {cs.results.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground font-body">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-display font-bold text-foreground mb-4">Ready to Be Our Next Success Story?</h3>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">Book Free Consultation <ArrowRight className="w-5 h-5" /></Link>
          </Button>
        </div>
      </SectionWrapper>
    </div>
  </Layout>
);

export default CaseStudies;
