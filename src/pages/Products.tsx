import { Layout } from "@/components/Layout";
import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, Clock, Smartphone, Eye, Tractor, ShoppingBag,
  Sparkles,
} from "lucide-react";
import { InlineAIAssistant } from "@/components/InlineAIAssistant";
import hrmsImg from "@/assets/hrms-app.png";
import elearningImg from "@/assets/elearning-platform.png";
import healthcareImg from "@/assets/healthcare-platform.png";

const products = [
  {
    id: "hrms",
    title: "HRMS App",
    status: "Beta Live",
    description: "All-in-one Human Resource Management System that streamlines hiring, payroll, attendance, performance tracking, and employee lifecycle management.",
    image: hrmsImg,
    features: ["Employee Database", "Payroll Processing", "Attendance Tracking", "Performance Reviews", "Recruitment Pipeline", "Leave Management"],
    benefits: ["Reduce hiring time by 40%", "Automate payroll with 99% accuracy", "Real-time workforce analytics", "Mobile app for employees"],
  },
  {
    id: "elearning",
    title: "E-Learning Platform",
    status: "Coming Soon",
    description: "Comprehensive e-learning ecosystem supporting live classes, recorded lectures, interactive quizzes, and student progress analytics across all tech domains.",
    image: elearningImg,
    features: ["Live Video Classes", "Course Management", "Quiz & Assignments", "Student Analytics", "Certificate Generation", "Multi-device Support"],
    benefits: ["Scalable to 10K+ students", "85% course completion rate", "Interactive learning experience", "Industry-expert instructors"],
  },
  {
    id: "healthcare",
    title: "Healthcare Platform",
    status: "Coming Soon",
    description: "End-to-end healthcare management covering patient records, pharmacy operations, appointment scheduling, and multi-facility synchronization.",
    image: healthcareImg,
    features: ["Patient Records", "Pharmacy Management", "Appointment Scheduling", "Billing & Insurance", "Lab Integration", "Multi-facility Sync"],
    benefits: ["Reduce wait times by 45%", "85% fewer billing errors", "Cross-facility patient lookup", "HIPAA-ready platform"],
  },
];

const upcomingApps = [
  { title: "Blind Assistance App", description: "Assistive technology for visually impaired users.", icon: Eye },
  { title: "Hotel Management App", description: "End-to-end hotel operations management.", icon: ShoppingBag },
  { title: "Farming App", description: "Smart farming tools for the agricultural sector.", icon: Tractor },
  { title: "E-Kirana App", description: "Digital kirana store e-commerce solution.", icon: ShoppingBag },
];

const roadmap = [
  { quarter: "Q1 2026", items: ["HRMS Beta Launch", "Core HR features live"] },
  { quarter: "Q2 2026", items: ["E-Learning Platform Alpha", "Healthcare Platform Design"] },
  { quarter: "Q3 2026", items: ["E-Learning Public Beta", "Healthcare Alpha"] },
  { quarter: "Q4 2026", items: ["Blind Assistance App", "Hotel Management App"] },
  { quarter: "Q1 2027", items: ["Farming App Launch", "E-Kirana Platform"] },
];

const Products = () => (
  <Layout>
      <div className="pt-24 bg-background">
      {/* Main Products */}
      <SectionWrapper>
        <SectionHeader
          badge="Our Products"
          title="Innovative Platforms Built for Scale"
          subtitle="Powerful, purpose-built software solutions designed to transform how industries operate."
        />
        <div className="space-y-20">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={`grid lg:grid-cols-2 gap-10 items-center border-t border-border/40 pt-10 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-sm border border-primary/20 font-body mb-4">
                    {product.status}
                  </span>
                  <h3 className="text-3xl font-display font-bold text-foreground mb-4">{product.title}</h3>
                  <p className="text-muted-foreground font-body mb-6">{product.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {product.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" /> {f}
                      </div>
                    ))}
                  </div>

                  <div className="bg-card border border-primary/20 rounded-sm p-4 mb-6 shadow-card">
                    <h4 className="text-sm font-semibold text-primary font-body mb-2">Key Benefits</h4>
                    {product.benefits.map((b) => (
                      <p key={b} className="text-sm text-muted-foreground font-body mb-1">• {b}</p>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button variant="hero" size="lg" asChild>
                      <Link to="/contact">{product.status === "Beta Live" ? "Request Demo" : "Join Waitlist"} <ArrowRight className="w-4 h-4" /></Link>
                    </Button>
                  </div>
                </div>

                <div className={`flex justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl" />
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="relative z-10 max-h-96 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Upcoming Apps */}
      <SectionWrapper className="bg-card/30 border-y border-border/30">
        <SectionHeader
          badge="Coming Soon"
          title="Applications on the Way"
          subtitle="Innovative solutions currently in development to serve emerging market needs."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingApps.map((app, i) => (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-card/80 border-border/30 hover:border-primary/50 h-full text-center group shadow-card">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <app.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-base font-display font-semibold text-foreground mb-2">{app.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{app.description}</p>
                  <span className="inline-block mt-4 px-3 py-1 text-xs text-primary bg-primary/10 rounded-full border border-primary/20 font-body">
                    Coming Soon
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Roadmap */}
      <SectionWrapper>
        <SectionHeader badge="Roadmap" title="Product Timeline" subtitle="Our planned milestones for the next 12 months." />
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border/50 -translate-x-1/2" />
          {roadmap.map((phase, i) => (
            <motion.div
              key={phase.quarter}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative flex items-start gap-6 mb-10 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10" />
              <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                <span className="text-sm font-semibold text-primary font-body">{phase.quarter}</span>
                <div className="mt-2 space-y-1">
                  {phase.items.map((item) => (
                    <p key={item} className="text-sm text-muted-foreground font-body">{item}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-card/30 border-y border-border">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <span className="editorial-kicker mb-5">AI-Powered Guidance</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
              Which product is right for you?
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Ask our AI assistant about product features, demos, pricing, launch dates, or which platform best fits your industry. It's here to help you decide.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Request a Demo <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Ask our AI Assistant</span>
            </div>
            <InlineAIAssistant pageKey="products" />
          </div>
        </div>
      </SectionWrapper>
    </div>
  </Layout>
);

export default Products;
