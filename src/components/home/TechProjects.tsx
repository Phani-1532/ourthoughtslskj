import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Database, Cloud, Brain, Smartphone, Globe, ShieldCheck, Cpu } from "lucide-react";

type Item = {
  title: string;
  description: string;
  type: "Product" | "Industry" | "Service";
  link: string;
};

const techs: { name: string; icon: any; items: Item[] }[] = [
  {
    name: "React & Next.js",
    icon: Code2,
    items: [
      { title: "HRMS App", description: "Web dashboard built with React for HR teams.", type: "Product", link: "/products" },
      { title: "E-Learning Platform", description: "Interactive learning UI with live classes.", type: "Product", link: "/products" },
      { title: "Website Design & Marketing", description: "High-converting marketing sites.", type: "Service", link: "/services/web-design" },
    ],
  },
  {
    name: "Node.js & APIs",
    icon: Globe,
    items: [
      { title: "E-Commerce", description: "Order processing & inventory APIs.", type: "Industry", link: "/industries/ecommerce" },
      { title: "HRMS App", description: "Payroll & attendance backend services.", type: "Product", link: "/products" },
    ],
  },
  {
    name: "Python & AI/ML",
    icon: Brain,
    items: [
      { title: "AI in ALL", description: "Predictive analytics & automation across sectors.", type: "Industry", link: "/industries/ai" },
      { title: "Healthcare Platform", description: "Smart triage & medical data insights.", type: "Product", link: "/products" },
    ],
  },
  {
    name: "Mobile (React Native)",
    icon: Smartphone,
    items: [
      { title: "Blind Assistance App", description: "Accessibility-first mobile app.", type: "Product", link: "/products" },
      { title: "Farming App", description: "Smart farming on the go.", type: "Product", link: "/products" },
      { title: "E-Kirana App", description: "Digital kirana commerce mobile app.", type: "Product", link: "/products" },
    ],
  },
  {
    name: "Cloud (AWS / GCP)",
    icon: Cloud,
    items: [
      { title: "IT & Technology", description: "Cloud migration & DevOps services.", type: "Industry", link: "/industries/technology" },
      { title: "Hospitality", description: "Multi-property cloud platform.", type: "Industry", link: "/industries/hospitality" },
    ],
  },
  {
    name: "Database (Postgres / Mongo)",
    icon: Database,
    items: [
      { title: "HR & Finance", description: "Reporting & analytics on operational data.", type: "Industry", link: "/industries/hr-finance" },
      { title: "Law Management", description: "Secure case & document storage.", type: "Industry", link: "/industries/law" },
    ],
  },
  {
    name: "Security & Compliance",
    icon: ShieldCheck,
    items: [
      { title: "Healthcare", description: "HIPAA-ready healthcare workflows.", type: "Industry", link: "/industries/healthcare" },
      { title: "Law Management", description: "Audit-ready legal data security.", type: "Industry", link: "/industries/law" },
    ],
  },
  {
    name: "IoT & Edge",
    icon: Cpu,
    items: [
      { title: "Farming App", description: "Sensor-driven smart farming.", type: "Product", link: "/products" },
      { title: "Hotel Management App", description: "Connected hotel operations.", type: "Product", link: "/products" },
    ],
  },
];

export const TechProjects = () => {
  const [active, setActive] = useState(0);
  const current = techs[active];

  return (
    <SectionWrapper>
      <SectionHeader
        badge="Technology Stack"
        title="Pick a Technology — See Projects"
        subtitle="Click any technology to see the products, industries, and services we deliver with it."
      />

      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
        {techs.map((t, i) => {
          const Icon = t.icon;
          const isActive = i === active;
          return (
            <button
              key={t.name}
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-elevated"
                  : "bg-background text-foreground border-border hover:border-primary/40 hover:text-primary"
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.name}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {current.items.map((item) => (
            <Card key={item.title} className="bg-background border-border hover:border-primary/30 group transition-all hover:-translate-y-1 hover:shadow-elevated">
              <CardContent className="p-6">
                <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/15 mb-3">
                  {item.type}
                </span>
                <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <Button variant="outline" size="sm" asChild>
                  <Link to={item.link}>
                    View <ArrowRight className="w-3 h-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
};
