import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Cpu, Hotel, BarChart3, Brain, ArrowRight } from "lucide-react";

const industries = [
  { title: "Healthcare", description: "End-to-end solutions with a humanity touch.", icon: Heart, path: "/industries/healthcare" },
  { title: "E-Commerce", description: "Full-stack commerce and inventory platforms.", icon: ShoppingCart, path: "/industries/ecommerce" },
  { title: "IT & Technology", description: "Cutting-edge digital transformation services.", icon: Cpu, path: "/industries/technology" },
  { title: "Hospitality", description: "Sustainability and reputation management.", icon: Hotel, path: "/industries/hospitality" },
  { title: "HR & Finance", description: "Intelligent HR and financial management.", icon: BarChart3, path: "/industries/hr-finance" },
  { title: "AI in ALL", description: "AI-powered solutions across every sector.", icon: Brain, path: "/industries/ai" },
];

export const IndustryPreview = () => (
  <SectionWrapper className="bg-card/50">
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
          transition={{ delay: i * 0.08 }}
        >
          <Link to={ind.path}>
            <Card className="bg-background border-border hover:border-primary/30 group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-card cursor-pointer">
              <CardContent className="p-5 md:p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                  <ind.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{ind.title}</h3>
                  <p className="text-xs text-muted-foreground">{ind.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);
