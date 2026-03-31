import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const SectionWrapper = ({ children, className = "", id }: SectionWrapperProps) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={`py-16 md:py-24 ${className}`}
  >
    <div className="container mx-auto px-4 md:px-6">{children}</div>
  </motion.section>
);

export const SectionHeader = ({
  badge,
  title,
  subtitle,
  center = true,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) => (
  <div className={`mb-12 md:mb-16 ${center ? "text-center" : ""}`}>
    {badge && (
      <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/5 rounded-full border border-primary/10">
        {badge}
      </span>
    )}
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">{title}</h2>
    {subtitle && <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);
