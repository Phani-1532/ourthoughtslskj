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
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className={`py-20 md:py-28 ${className}`}
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
  <div className={`mb-16 ${center ? "text-center" : ""}`}>
    {badge && (
      <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 rounded-full border border-primary/20 font-body">
        {badge}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground mb-4">{title}</h2>
    {subtitle && <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">{subtitle}</p>}
  </div>
);
