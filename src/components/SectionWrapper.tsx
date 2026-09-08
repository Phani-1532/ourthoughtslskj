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
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={`relative py-16 md:py-24 ${className}`}
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
  <div className={`mb-10 md:mb-14 ${center ? "text-center" : ""}`}>
    {badge && (
      <span className="editorial-kicker mb-5">
        {badge}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.05] tracking-tight text-foreground mb-5">{title}</h2>
    {subtitle && <p className={`text-sm md:text-lg text-muted-foreground max-w-2xl leading-relaxed ${center ? "mx-auto" : ""}`}>{subtitle}</p>}
  </div>
);
