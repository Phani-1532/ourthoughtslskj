import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight, Code2, Database, Cloud, Brain, Smartphone, Globe, ShieldCheck, Cpu, LayoutGrid } from "lucide-react";

type ItemType = "Product" | "Industry" | "Service";
type Item = {
  title: string;
  description: string;
  type: ItemType;
  link: string;
};

const techs: { name: string; icon: any; items: Item[] }[] = [
  {
    name: "React & Next.js",
    icon: Code2,
    items: [
      { title: "HRMS App", description: "Web dashboard built with React for HR teams.", type: "Product", link: "/products" },
      { title: "E-Learning Platform", description: "Interactive learning UI with live classes.", type: "Product", link: "/products" },
      { title: "Healthcare Platform", description: "Patient & facility management web app.", type: "Product", link: "/products" },
      { title: "IT & Technology", description: "Modern web platforms for tech companies.", type: "Industry", link: "/industries/technology" },
      { title: "E-Commerce", description: "Storefronts & dashboards built in React.", type: "Industry", link: "/industries/ecommerce" },
      { title: "Website Design & Marketing", description: "High-converting marketing sites.", type: "Service", link: "/services/web-design" },
    ],
  },
  {
    name: "Node.js & APIs",
    icon: Globe,
    items: [
      { title: "HRMS App", description: "Payroll & attendance backend services.", type: "Product", link: "/products" },
      { title: "E-Kirana App", description: "Order & catalog APIs for kirana stores.", type: "Product", link: "/products" },
      { title: "E-Commerce", description: "Order processing & inventory APIs.", type: "Industry", link: "/industries/ecommerce" },
      { title: "Hospitality", description: "Booking & PMS integrations.", type: "Industry", link: "/industries/hospitality" },
      { title: "API & Integration Services", description: "Custom REST & GraphQL APIs.", type: "Service", link: "/services" },
    ],
  },
  {
    name: "Python & AI/ML",
    icon: Brain,
    items: [
      { title: "Healthcare Platform", description: "Smart triage & medical data insights.", type: "Product", link: "/products" },
      { title: "Blind Assistance App", description: "Vision AI for accessibility.", type: "Product", link: "/products" },
      { title: "AI in ALL", description: "Predictive analytics & automation across sectors.", type: "Industry", link: "/industries/ai" },
      { title: "Healthcare", description: "AI-assisted diagnostics & workflows.", type: "Industry", link: "/industries/healthcare" },
      { title: "AI & Data Science", description: "ML model development & MLOps.", type: "Service", link: "/services" },
    ],
  },
  {
    name: "Mobile (React Native)",
    icon: Smartphone,
    items: [
      { title: "Blind Assistance App", description: "Accessibility-first mobile app.", type: "Product", link: "/products" },
      { title: "Farming App", description: "Smart farming on the go.", type: "Product", link: "/products" },
      { title: "E-Kirana App", description: "Digital kirana commerce mobile app.", type: "Product", link: "/products" },
      { title: "Hotel Management App", description: "Mobile-first PMS for hotels.", type: "Product", link: "/products" },
      { title: "Hospitality", description: "Guest-facing mobile experiences.", type: "Industry", link: "/industries/hospitality" },
      { title: "Mobile App Development", description: "Cross-platform iOS & Android apps.", type: "Service", link: "/services" },
    ],
  },
  {
    name: "Cloud (AWS / GCP)",
    icon: Cloud,
    items: [
      { title: "HRMS App", description: "Multi-tenant cloud-hosted HRMS.", type: "Product", link: "/products" },
      { title: "IT & Technology", description: "Cloud migration & DevOps services.", type: "Industry", link: "/industries/technology" },
      { title: "Hospitality", description: "Multi-property cloud platform.", type: "Industry", link: "/industries/hospitality" },
      { title: "Cloud & DevOps", description: "Infrastructure, CI/CD, and SRE.", type: "Service", link: "/services" },
    ],
  },
  {
    name: "Database (Postgres / Mongo)",
    icon: Database,
    items: [
      { title: "HRMS App", description: "Relational data for HR operations.", type: "Product", link: "/products" },
      { title: "E-Learning Platform", description: "Course & progress data stores.", type: "Product", link: "/products" },
      { title: "HR & Finance", description: "Reporting & analytics on operational data.", type: "Industry", link: "/industries/hr-finance" },
      { title: "Law Management", description: "Secure case & document storage.", type: "Industry", link: "/industries/law" },
      { title: "Data Engineering", description: "Schema design, ETL, and warehousing.", type: "Service", link: "/services" },
    ],
  },
  {
    name: "Security & Compliance",
    icon: ShieldCheck,
    items: [
      { title: "Healthcare Platform", description: "HIPAA-ready medical workflows.", type: "Product", link: "/products" },
      { title: "Healthcare", description: "Compliance-first healthcare delivery.", type: "Industry", link: "/industries/healthcare" },
      { title: "Law Management", description: "Audit-ready legal data security.", type: "Industry", link: "/industries/law" },
      { title: "HR & Finance", description: "SOC2-aligned financial systems.", type: "Industry", link: "/industries/hr-finance" },
      { title: "Cybersecurity Services", description: "Audits, pen-testing & hardening.", type: "Service", link: "/services" },
    ],
  },
  {
    name: "IoT & Edge",
    icon: Cpu,
    items: [
      { title: "Farming App", description: "Sensor-driven smart farming.", type: "Product", link: "/products" },
      { title: "Hotel Management App", description: "Connected hotel operations.", type: "Product", link: "/products" },
      { title: "Hospitality", description: "Smart-room & energy optimization.", type: "Industry", link: "/industries/hospitality" },
      { title: "IoT Solutions", description: "Edge devices & telemetry pipelines.", type: "Service", link: "/services" },
    ],
  },
];

const FILTERS: ("All" | ItemType)[] = ["All", "Product", "Industry", "Service"];

export const TechProjects = () => {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState<"All" | ItemType>("All");
  const current = techs[active];

  const filtered = useMemo(
    () => (filter === "All" ? current.items : current.items.filter((i) => i.type === filter)),
    [current, filter],
  );

  const counts = useMemo(
    () => ({
      All: current.items.length,
      Product: current.items.filter((i) => i.type === "Product").length,
      Industry: current.items.filter((i) => i.type === "Industry").length,
      Service: current.items.filter((i) => i.type === "Service").length,
    }),
    [current],
  );

  const handleSelectTech = (i: number) => {
    setActive(i);
    setFilter("All");
    requestAnimationFrame(() => {
      document.getElementById("tech-projects-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <SectionWrapper id="tech-projects">
      <SectionHeader
        badge="Technology Stack"
        title="Pick a Technology — See Projects"
        subtitle="Click any technology to see the products, industries, and services we deliver with it."
      />

      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
        {techs.map((t, i) => {
          const Icon = t.icon;
          const isActive = i === active;
          return (
            <button
              key={t.name}
              onClick={() => handleSelectTech(i)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-elevated"
                  : "bg-background text-foreground border-border hover:border-primary/40 hover:text-primary"
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.name}
              <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground"}`}>
                {t.items.length}
              </span>
            </button>
          );
        })}
      </div>

      <div id="tech-projects-results" className="scroll-mt-24">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              {FILTERS.map((f) => (
                <TabsTrigger key={f} value={f} className="gap-2">
                  {f === "All" && <LayoutGrid className="w-3.5 h-3.5" />}
                  {f}
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted-foreground/15">
                    {counts[f]}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={filter} forceMount>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name + filter}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              >
                {filtered.length === 0 ? (
                  <div className="col-span-full text-center text-sm text-muted-foreground py-12">
                    No {filter.toLowerCase()}s for {current.name} yet.
                  </div>
                ) : (
                  filtered.map((item) => (
                    <Card
                      key={item.title + item.type}
                      className="bg-background border-border hover:border-primary/30 group transition-all hover:-translate-y-1 hover:shadow-elevated"
                    >
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
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </SectionWrapper>
  );
};
