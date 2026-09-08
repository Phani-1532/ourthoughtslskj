import { Layout } from "@/components/Layout";
import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart, Globe, Smartphone, ArrowRight, CheckCircle, TrendingUp, Users, Target,
} from "lucide-react";

const services = [
  {
    id: "business-segments",
    title: "Business Segments",
    icon: ShoppingCart,
    problem: "Companies struggle with fragmented business processes across multiple systems.",
    solution: "Our integrated BPM solutions unify e-commerce, HR, finance, and operations into a single platform.",
    impact: "60% reduction in operational overhead and 3x faster decision-making.",
    useCases: ["E-Commerce Operations", "Inventory Management", "Invoice Processing", "Order Fulfillment"],
    benefits: ["Unified Dashboard", "Real-time Analytics", "Automated Workflows", "Cost Reduction"],
  },
  {
    id: "web-design",
    title: "Website Design & Marketing",
    icon: Globe,
    problem: "Businesses lose leads due to outdated websites and poor digital presence.",
    solution: "We build high-converting, visually stunning websites with built-in SEO and marketing automation.",
    impact: "Average 150% increase in lead generation within 3 months.",
    useCases: ["Corporate Websites", "E-Commerce Stores", "Landing Pages", "SEO Campaigns"],
    benefits: ["Responsive Design", "SEO Optimized", "Analytics Integration", "Conversion Focused"],
  },
  {
    id: "applications",
    title: "Custom Applications",
    icon: Smartphone,
    problem: "Off-the-shelf software can't address unique business requirements.",
    solution: "We develop custom mobile and web applications tailored to your specific workflow needs.",
    impact: "40% improvement in operational efficiency with purpose-built tools.",
    useCases: ["Mobile Apps", "Enterprise Portals", "SaaS Platforms", "API Development"],
    benefits: ["Custom Built", "Scalable Architecture", "Cross-Platform", "Ongoing Support"],
  },
];

const Services = () => (
  <Layout>
      <div className="pt-24 bg-background">
      <SectionWrapper>
        <SectionHeader
          badge="What We Serve"
          title="Comprehensive Business Solutions"
          subtitle="We deliver end-to-end solutions across digital transformation, application development, and marketing."
        />
        <div className="space-y-20">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              id={service.id}
            >
              <div className="grid lg:grid-cols-2 gap-10 items-start border-t border-border/40 pt-10">
                {/* Problem → Solution → Impact */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground">{service.title}</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <Target className="w-5 h-5 text-destructive mt-1 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-destructive font-body mb-1">The Problem</p>
                        <p className="text-muted-foreground font-body">{service.problem}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-primary font-body mb-1">Our Solution</p>
                        <p className="text-muted-foreground font-body">{service.solution}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <TrendingUp className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-green-500 font-body mb-1">The Impact</p>
                        <p className="text-muted-foreground font-body">{service.impact}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-8">
                    <Button variant="cta" size="lg" asChild>
                      <Link to="/contact">Get Started <ArrowRight className="w-4 h-4" /></Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/case-studies">See Case Studies</Link>
                    </Button>
                  </div>
                </div>

                {/* Use Cases + Benefits */}
                <div className="space-y-6">
                  <Card className="bg-card/80 border-border/30 shadow-card">
                    <CardContent className="p-6">
                      <h4 className="font-display font-semibold text-foreground mb-4">Use Cases</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {service.useCases.map((uc) => (
                          <div key={uc} className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {uc}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/80 border-border/30 shadow-card">
                    <CardContent className="p-6">
                      <h4 className="font-display font-semibold text-foreground mb-4">Key Benefits</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {service.benefits.map((b) => (
                          <div key={b} className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                            {b}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  </Layout>
);

export default Services;
