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
  <SectionWrapper className="bg-gradient-primary">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="text-center p-6"
        >
          <div className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-2 tracking-tight">
            <Counter target={stat.value} suffix={stat.suffix} />
          </div>
          <p className="text-sm text-primary-foreground/70 font-medium">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);
