import { Layout } from "@/components/Layout";
import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart, ShoppingCart, Cpu, Hotel, BarChart3, Brain, Utensils, Scale, Users,
  ArrowRight, CheckCircle, Target, TrendingUp,
} from "lucide-react";

const industriesData: Record<string, {
  title: string; icon: any; tagline: string;
  problem: string; solution: string; impact: string;
  useCases: string[]; benefits: string[];
}> = {
  healthcare: {
    title: "Healthcare", icon: Heart, tagline: "End-to-end solutions with a humanity touch.",
    problem: "Healthcare facilities struggle with fragmented systems for patient management, pharmacy, and facility operations.",
    solution: "Our integrated healthcare platform covers pharmacy management, patient records, facility scheduling, and compliance tracking.",
    impact: "60% improvement in operational efficiency and reduced patient wait times by 45%.",
    useCases: ["Pharmacy Management", "Patient Records", "Facility Scheduling", "Compliance Tracking"],
    benefits: ["HIPAA Ready", "Real-time Dashboards", "Automated Billing", "Multi-facility Support"],
  },
  ecommerce: {
    title: "E-Commerce", icon: ShoppingCart, tagline: "Full-stack commerce and inventory platforms.",
    problem: "Online businesses face challenges with inventory sync, order processing, and multi-channel management.",
    solution: "We build unified commerce platforms with real-time inventory, automated order processing, and multi-channel integration.",
    impact: "35% increase in order processing speed and 25% reduction in inventory costs.",
    useCases: ["Online Stores", "Marketplace Integration", "Inventory Sync", "Payment Processing"],
    benefits: ["Multi-channel", "Real-time Sync", "Analytics", "Scalable"],
  },
  technology: {
    title: "IT & Technology", icon: Cpu, tagline: "Cutting-edge digital transformation services.",
    problem: "Companies lack the technical expertise to modernize legacy systems and adopt emerging technologies.",
    solution: "We provide end-to-end digital transformation including cloud migration, AI integration, and custom software development.",
    impact: "50% cost reduction through automation and 2x faster time-to-market for digital products.",
    useCases: ["Cloud Migration", "AI Integration", "Custom Software", "DevOps"],
    benefits: ["Modern Stack", "Scalable", "Secure", "24/7 Support"],
  },
  hospitality: {
    title: "Hospitality", icon: Hotel, tagline: "Sustainability and reputation management.",
    problem: "Hotels and restaurants struggle with operations management, guest experience, and online reputation.",
    solution: "Our hospitality platform covers booking management, guest services, F&B operations, and reputation monitoring.",
    impact: "30% increase in guest satisfaction scores and 20% improvement in operational efficiency.",
    useCases: ["Booking Management", "Guest Services", "F&B Operations", "Reputation Monitoring"],
    benefits: ["Unified Platform", "Guest Analytics", "Revenue Management", "Multi-property"],
  },
  "hr-finance": {
    title: "HR & Finance", icon: BarChart3, tagline: "Intelligent HR and financial management.",
    problem: "Organizations waste time on manual HR processes and lack financial visibility across departments.",
    solution: "Our HRMS and finance platform automates payroll, recruitment, performance tracking, and financial reporting.",
    impact: "40% reduction in hiring time and 95% payroll accuracy improvement.",
    useCases: ["Payroll Processing", "Recruitment", "Performance Reviews", "Financial Reporting"],
    benefits: ["Automated Payroll", "Applicant Tracking", "Analytics Dashboard", "Compliance"],
  },
  "food-services": {
    title: "Food Services", icon: Utensils, tagline: "Connecting home cooks to local communities.",
    problem: "Home-based food businesses lack a platform to reach customers and manage orders efficiently.",
    solution: "Our food services platform empowers home cooks, especially women, to sell home-made food items digitally.",
    impact: "Enabling 500+ home cooks to build sustainable food businesses.",
    useCases: ["Home Kitchen Management", "Order Processing", "Delivery Coordination", "Menu Management"],
    benefits: ["Easy Setup", "Payment Integration", "Delivery Tracking", "Customer Reviews"],
  },
  law: {
    title: "Law Management", icon: Scale, tagline: "Case management and client relationship tools.",
    problem: "Law firms struggle with case tracking, document management, and client communication.",
    solution: "Our legal management platform streamlines case management, document handling, and client relationship tracking.",
    impact: "35% improvement in case resolution time and better client retention.",
    useCases: ["Case Management", "Document Storage", "Client Portal", "Billing"],
    benefits: ["Secure Storage", "Deadline Tracking", "Client Portal", "Billing Integration"],
  },
  ai: {
    title: "AI in ALL", icon: Brain, tagline: "AI-powered solutions across every sector.",
    problem: "Businesses struggle to identify where and how AI can deliver real value.",
    solution: "We integrate AI across all our solutions — from predictive analytics to intelligent automation.",
    impact: "Organizations see 3x ROI on AI investments within the first year.",
    useCases: ["Predictive Analytics", "Process Automation", "Natural Language Processing", "Computer Vision"],
    benefits: ["Custom Models", "Data-Driven", "Scalable AI", "Cross-Industry"],
  },
  professional: {
    title: "Professional Services", icon: Users, tagline: "Consulting and implementation expertise.",
    problem: "Organizations need expert guidance for technology adoption and process optimization.",
    solution: "Our consulting teams bring deep domain expertise for strategy, implementation, and change management.",
    impact: "90% of consulting engagements deliver ROI within 6 months.",
    useCases: ["Strategy Consulting", "Implementation", "Training", "Change Management"],
    benefits: ["Expert Teams", "Proven Methods", "Custom Approach", "Measurable ROI"],
  },
};

const IndustryDetail = () => {
  const { slug } = useParams();
  const data = slug ? industriesData[slug] : null;

  if (!data) {
    return (
      <Layout>
        <div className="pt-32">
          <SectionWrapper>
            <SectionHeader title="Industries" subtitle="Select an industry to explore our solutions." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(industriesData).map(([key, ind], i) => (
                <motion.div key={key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Link to={`/industries/${key}`}>
                    <Card className="bg-gradient-card border-border/30 hover:border-primary/30 h-full group transition-all hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                          <ind.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-display font-semibold text-foreground mb-2">{ind.title}</h3>
                        <p className="text-sm text-muted-foreground font-body">{ind.tagline}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </Layout>
    );
  }

  const Icon = data.icon;

  return (
    <Layout>
      <div className="pt-24">
        <SectionWrapper>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">{data.title}</h1>
              <p className="text-muted-foreground font-body">{data.tagline}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex gap-4">
                <Target className="w-5 h-5 text-destructive mt-1 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-destructive font-body mb-1">The Problem</p>
                  <p className="text-muted-foreground font-body">{data.problem}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-primary font-body mb-1">Our Solution</p>
                  <p className="text-muted-foreground font-body">{data.solution}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <TrendingUp className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-green-500 font-body mb-1">The Impact</p>
                  <p className="text-muted-foreground font-body">{data.impact}</p>
                </div>
              </div>
              <Button variant="cta" size="lg" className="mt-6" asChild>
                <Link to="/contact">Get Started <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-card border-border/30">
                <CardContent className="p-6">
                  <h4 className="font-display font-semibold text-foreground mb-4">Use Cases</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {data.useCases.map((uc) => (
                      <div key={uc} className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {uc}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card border-border/30">
                <CardContent className="p-6">
                  <h4 className="font-display font-semibold text-foreground mb-4">Key Benefits</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {data.benefits.map((b) => (
                      <div key={b} className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" /> {b}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </Layout>
  );
};

export default IndustryDetail;
