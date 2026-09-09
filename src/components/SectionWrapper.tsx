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
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`inline-flex items-center gap-2.5 mb-5 ${center ? "" : ""}`}
      >
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
        <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
          {badge}
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
      </motion.div>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-3xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.05] tracking-tight text-foreground mb-5 text-balance"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`text-sm md:text-lg text-muted-foreground max-w-2xl leading-relaxed ${center ? "mx-auto" : ""}`}
      >
        {subtitle}
      </motion.p>
    )}
    {center && (
      <div className="flex items-center justify-center gap-1.5 mt-6">
        <span className="h-1 w-1 rounded-full bg-primary/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
        <span className="h-2 w-2 rounded-full bg-primary shadow-glow" />
        <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
        <span className="h-1 w-1 rounded-full bg-primary/30" />
      </div>
    )}
  </div>
);
