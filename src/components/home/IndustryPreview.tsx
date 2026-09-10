import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Cpu, Hotel, BarChart3, Brain, ArrowRight } from "lucide-react";

const industries = [
  { title: "Healthcare", description: "End-to-end solutions with a humanity touch.", icon: Heart, color: "bg-red-500/10 text-red-400", glow: "bg-red-500/8", path: "/industries/healthcare", image: "https://images.pexels.com/photos/6285379/pexels-photo-6285379.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
  { title: "E-Commerce", description: "Full-stack commerce and inventory platforms.", icon: ShoppingCart, color: "bg-amber-500/10 text-amber-400", glow: "bg-amber-500/8", path: "/industries/ecommerce", image: "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940" },
  { title: "IT & Technology", description: "Cutting-edge digital transformation services.", icon: Cpu, color: "bg-blue-500/10 text-blue-400", glow: "bg-blue-500/8", path: "/industries/technology", image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
  { title: "Hospitality", description: "Sustainability and reputation management.", icon: Hotel, color: "bg-emerald-500/10 text-emerald-400", glow: "bg-emerald-500/8", path: "/industries/hospitality", image: "https://images.pexels.com/photos/6466490/pexels-photo-6466490.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
  { title: "HR & Finance", description: "Intelligent HR and financial management.", icon: BarChart3, color: "bg-cyan-500/10 text-cyan-400", glow: "bg-cyan-500/8", path: "/industries/hr-finance", image: "https://images.pexels.com/photos/5198201/pexels-photo-5198201.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
  { title: "AI in ALL", description: "AI-powered solutions across every sector.", icon: Brain, color: "bg-pink-500/10 text-pink-400", glow: "bg-pink-500/8", path: "/industries/ai", image: "https://images.pexels.com/photos/8124399/pexels-photo-8124399.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
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
            <div className="relative rounded-2xl border border-border bg-card hover:border-primary/30 group h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elevated cursor-pointer overflow-hidden">
              {/* Image header */}
              <div className="relative h-36 overflow-hidden">
                <img
                  src={ind.image}
                  alt={ind.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className={`absolute top-3 left-3 w-11 h-11 rounded-xl ${ind.color} flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                  <ind.icon className="w-5 h-5" />
                </div>
              </div>
              {/* Content */}
              <div className="p-5 relative">
                <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full ${ind.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none`} />
                <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors relative">{ind.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 relative">{ind.description}</p>
                <span className="text-xs text-primary font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 group-hover:gap-2 transition-all relative">
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
