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
    <div className="text-center mb-16">
      <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 rounded-full border border-primary/20 font-body">
        Testimonials
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground mb-4">
        Voices That Drive Us Forward
      </h2>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      {testimonials.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12 }}
          className="bg-gradient-card border border-border/30 rounded-xl p-8 relative"
        >
          <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
          <p className="text-foreground font-body mb-6 italic leading-relaxed">"{t.quote}"</p>
          <div>
            <p className="font-display font-semibold text-foreground">{t.name}</p>
            <p className="text-sm text-muted-foreground font-body">{t.role}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);
