import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Cpu, Hotel, BarChart3, Brain, ArrowRight } from "lucide-react";

const industries = [
  { title: "Healthcare", description: "End-to-end solutions with a humanity touch.", icon: Heart, color: "bg-red-500/10 text-red-400", glow: "bg-red-500/8", path: "/industries/healthcare" },
  { title: "E-Commerce", description: "Full-stack commerce and inventory platforms.", icon: ShoppingCart, color: "bg-amber-500/10 text-amber-400", glow: "bg-amber-500/8", path: "/industries/ecommerce" },
  { title: "IT & Technology", description: "Cutting-edge digital transformation services.", icon: Cpu, color: "bg-blue-500/10 text-blue-400", glow: "bg-blue-500/8", path: "/industries/technology" },
  { title: "Hospitality", description: "Sustainability and reputation management.", icon: Hotel, color: "bg-emerald-500/10 text-emerald-400", glow: "bg-emerald-500/8", path: "/industries/hospitality" },
  { title: "HR & Finance", description: "Intelligent HR and financial management.", icon: BarChart3, color: "bg-cyan-500/10 text-cyan-400", glow: "bg-cyan-500/8", path: "/industries/hr-finance" },
  { title: "AI in ALL", description: "AI-powered solutions across every sector.", icon: Brain, color: "bg-pink-500/10 text-pink-400", glow: "bg-pink-500/8", path: "/industries/ai" },
];

export const IndustryPreview = () => (
  <SectionWrapper className="bg-card/40 relative overflow-hidden">
    <SectionHeader
      badge="Industries"
      title="Multi-Domain Expertise"
      subtitle="We deliver transformative solutions across diverse industry verticals."
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {industries.map((ind, i) => (
        <motion.div
          key={ind.title}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
        >
          <Link to={ind.path}>
            <div className="relative p-6 rounded-2xl border border-border bg-card hover:border-primary/30 group h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elevated cursor-pointer flex items-start gap-4 overflow-hidden">
              {/* Colored glow on hover */}
              <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full ${ind.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`} />
              <div className={`w-12 h-12 rounded-xl ${ind.color} flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                <ind.icon className="w-5 h-5" />
              </div>
              <div className="relative">
                <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{ind.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{ind.description}</p>
                <span className="text-xs text-primary font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);
