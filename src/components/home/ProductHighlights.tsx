import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import hrmsImg from "@/assets/hrms-app.png";
import elearningImg from "@/assets/elearning-platform.png";
import healthcareImg from "@/assets/healthcare-platform.png";

const products = [
  {
    title: "HRMS App",
    badge: "Beta Live",
    description: "All-in-one HR Management System. Streamline hiring, payroll, attendance, and employee management.",
    image: hrmsImg,
    link: "/products",
  },
  {
    title: "E-Learning Platform",
    badge: "Coming Soon",
    description: "Covers all tech domains with live classes, interactive courses, and industry-leading instructors.",
    image: elearningImg,
    link: "/products",
  },
  {
    title: "Healthcare Platform",
    badge: "Coming Soon",
    description: "End-to-end healthcare solutions including pharmacy management and facility operations.",
    image: healthcareImg,
    link: "/products",
  },
];

import { useIndustry } from "@/contexts/IndustryContext";
import { getIndustryContent } from "@/lib/industryContent";

export const ProductHighlights = () => {
  const { industry } = useIndustry();
  const c = getIndustryContent(industry)?.productsHeader;
  return (
  <SectionWrapper className="bg-card/50">
    <SectionHeader
      badge={c?.badge || "Our Products"}
      title={c?.title || "Innovative Solutions Built for Scale"}
      subtitle={c?.subtitle || "Powerful platforms designed to transform industries and drive measurable results."}
    />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {products.map((product, i) => (
        <motion.div
          key={product.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="bg-background border-border hover:border-primary/30 group overflow-hidden h-full flex flex-col hover:shadow-card transition-all">
            <div className="relative h-44 overflow-hidden bg-muted/30 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className="h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full border border-primary/15">
                {product.badge}
              </span>
            </div>
            <CardContent className="flex-1 flex flex-col p-5 md:p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">{product.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{product.description}</p>
              <Button variant="outline" size="sm" className="w-fit" asChild>
                <Link to={product.link}>
                  Learn More <ArrowRight className="w-3 h-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
  );
};
