import { SectionWrapper } from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Our Thoughts LSKJ transformed our HR operations completely. The HRMS platform saved us countless hours.",
    name: "Priya Sharma",
    role: "HR Director, TechCorp",
  },
  {
    quote: "The e-learning platform they built is world-class. Our students love the interactive experience.",
    name: "Rahul Mehta",
    role: "CEO, EduStar Academy",
  },
  {
    quote: "Their healthcare solutions brought efficiency and transparency to our hospital network operations.",
    name: "Dr. Anita Desai",
    role: "COO, MediCare+ Hospitals",
  },
  {
    quote: "Professional, innovative, and truly dedicated to employee growth. A rare combination in this industry.",
    name: "Vikram Patel",
    role: "Founder, GreenFarm Tech",
  },
];

export const Testimonials = () => (
  <SectionWrapper className="bg-card/50">
    <div className="text-center mb-12 md:mb-16">
      <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/5 rounded-full border border-primary/10">
        Testimonials
      </span>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
        Voices That Drive Us Forward
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {testimonials.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="bg-background border border-border rounded-xl p-6 md:p-8 relative hover:shadow-card transition-shadow"
        >
          <Quote className="w-8 h-8 text-primary/10 absolute top-6 right-6" />
          <p className="text-foreground mb-6 italic leading-relaxed text-sm md:text-base">"{t.quote}"</p>
          <div>
            <p className="font-semibold text-foreground text-sm">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.role}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);
