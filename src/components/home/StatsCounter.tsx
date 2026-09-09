import { SectionWrapper } from "@/components/SectionWrapper";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Clients Served" },
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 6, suffix: "", label: "Industry Domains" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const StatsCounter = () => (
  <SectionWrapper className="bg-gradient-primary relative overflow-hidden">
    {/* Mesh overlay */}
    <div className="absolute inset-0 bg-gradient-cta-mesh opacity-60" />
    {/* Floating shapes */}
    <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary-foreground/5 blur-3xl animate-float-slow" />
    <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-primary-foreground/5 blur-3xl animate-float" />

    <div className="relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, type: "spring", damping: 20 }}
            className="text-center p-6 md:p-8 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/10 hover:border-primary-foreground/20 transition-all duration-300"
          >
            <div className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-2 tracking-tight">
              <Counter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="h-px w-12 bg-primary-foreground/20 mx-auto mb-3" />
            <p className="text-sm text-primary-foreground/70 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);
