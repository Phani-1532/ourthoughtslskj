import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
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

import { useIndustry } from "@/contexts/IndustryContext";
import { getIndustryContent } from "@/lib/industryContent";

export const ServicesGrid = () => {
  const { industry } = useIndustry();
  const c = getIndustryContent(industry)?.servicesHeader;
  return (
  <SectionWrapper>
    <SectionHeader
      badge={c?.badge || "What We Serve"}
      title={c?.title || "Business Process Segments"}
      subtitle={c?.subtitle || "Comprehensive technological solutions to help companies achieve greater success."}
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {services.map((service, i) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
        >
          <Link to={service.path} className="block group">
            <div className="relative p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated h-full overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:shadow-primary transition-all duration-300">
                  <service.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                <span className="text-xs text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
  );
};
