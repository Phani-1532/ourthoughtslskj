import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart, Globe, Building2, Hotel, Utensils, Users, FileText, Scale, ArrowRight,
} from "lucide-react";

const services = [
  { title: "E-Commerce Services", description: "Commerce ops, inventory management, order processing.", icon: ShoppingCart, path: "/services/business-segments" },
  { title: "Website Design & Marketing", description: "Visual design, UX/UI, SEO, multimedia solutions.", icon: Globe, path: "/services/web-design" },
  { title: "Hospital Management", description: "Architecture, planning, accreditations & operations.", icon: Building2, path: "/industries/healthcare" },
  { title: "Hotel Management", description: "Marketing, sales, F&B and hospitality services.", icon: Hotel, path: "/industries/hospitality" },
  { title: "Food Services", description: "Connecting home cooks to local communities.", icon: Utensils, path: "/industries/food-services" },
  { title: "HR and Payroll", description: "Salary processing, transitions, and workforce management.", icon: Users, path: "/industries/hr-finance" },
  { title: "Quotation & Invoices", description: "Streamlined quoting and formal payment requests.", icon: FileText, path: "/services/business-segments" },
  { title: "LAW Management", description: "Case management and client relationship tools.", icon: Scale, path: "/industries/law" },
];

export const ServicesGrid = () => (
  <SectionWrapper>
    <SectionHeader
      badge="What We Serve"
      title="Business Process Segments"
      subtitle="Comprehensive technological solutions to help companies achieve greater success."
    />
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service, i) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
        >
          <Card className="bg-gradient-card border-border/30 hover:border-primary/30 group h-full transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-display font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground font-body mb-4">{service.description}</p>
              <Link to={service.path} className="text-sm text-primary font-body font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);
