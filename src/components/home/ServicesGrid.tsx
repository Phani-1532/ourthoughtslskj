import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart, Globe, Building2, Hotel, Utensils, Users, FileText, Scale, ArrowRight,
} from "lucide-react";

const services = [
  { title: "E-Commerce Services", description: "Commerce ops, inventory management, order processing.", icon: ShoppingCart, path: "/services/business-segments", image: "https://images.pexels.com/photos/35560482/pexels-photo-35560482.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
  { title: "Website Design & Marketing", description: "Visual design, UX/UI, SEO, multimedia solutions.", icon: Globe, path: "/services/web-design", image: "https://images.pexels.com/photos/6285074/pexels-photo-6285074.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
  { title: "Hospital Management", description: "Architecture, planning, accreditations & operations.", icon: Building2, path: "/industries/healthcare", image: "https://images.pexels.com/photos/5234499/pexels-photo-5234499.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
  { title: "Hotel Management", description: "Marketing, sales, F&B and hospitality services.", icon: Hotel, path: "/industries/hospitality", image: "https://images.pexels.com/photos/29006838/pexels-photo-29006838.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
  { title: "Food Services", description: "Connecting home cooks to local communities.", icon: Utensils, path: "/industries/food-services", image: "https://images.pexels.com/photos/4393240/pexels-photo-4393240.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
  { title: "HR and Payroll", description: "Salary processing, transitions, and workforce management.", icon: Users, path: "/industries/hr-finance", image: "https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
  { title: "Quotation & Invoices", description: "Streamlined quoting and formal payment requests.", icon: FileText, path: "/services/business-segments", image: "https://images.pexels.com/photos/5198201/pexels-photo-5198201.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
  { title: "LAW Management", description: "Case management and client relationship tools.", icon: Scale, path: "/industries/law", image: "https://images.pexels.com/photos/7869057/pexels-photo-7869057.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.5 }}
        >
          <Link to={service.path} className="block group h-full">
            <div className="gradient-border relative rounded-2xl border border-border bg-card h-full overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elevated">
              {/* Image header */}
              <div className="relative h-28 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute top-2.5 left-2.5 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:bg-primary group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                  <service.icon className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <span className="absolute top-2.5 right-3 text-3xl font-extrabold text-foreground/10 group-hover:text-primary/20 transition-colors duration-500 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              {/* Content */}
              <div className="p-5 relative">
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/0 group-hover:bg-primary/8 transition-colors duration-500 blur-2xl pointer-events-none" />
                <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors relative">{service.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed relative">{service.description}</p>
                <span className="text-xs text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all relative">
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
