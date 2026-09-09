import { useState, useEffect } from "react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const fallbackTestimonials = [
  { id: "1", content: "Our Thoughts LSKJ transformed our HR operations completely. The HRMS platform saved us countless hours.", name: "Priya Sharma", role: "HR Director", company: "TechCorp", rating: 5 },
  { id: "2", content: "The e-learning platform they built is world-class. Our students love the interactive experience.", name: "Rahul Mehta", role: "CEO", company: "EduStar Academy", rating: 5 },
  { id: "3", content: "Their healthcare solutions brought efficiency and transparency to our hospital network operations.", name: "Dr. Anita Desai", role: "COO", company: "MediCare+ Hospitals", rating: 5 },
  { id: "4", content: "Professional, innovative, and truly dedicated to employee growth. A rare combination in this industry.", name: "Vikram Patel", role: "Founder", company: "GreenFarm Tech", rating: 5 },
];

const getInitials = (name: string) =>
  name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    supabase.from("testimonials").select("*").eq("published", true).then(({ data }) => {
      if (data && data.length > 0) setTestimonials(data);
    });
  }, []);

  return (
    <SectionWrapper className="bg-card/40 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="glow-orb w-[400px] h-[400px] bg-primary/4 top-[-10%] right-[-5%] animate-float-slow" />

      <div className="text-center mb-12 md:mb-16 relative z-10">
        <span className="editorial-kicker mb-5">Testimonials</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight text-balance">
          Voices That Drive Us Forward
        </h2>
        <div className="flex items-center justify-center gap-1.5 mt-6">
          <span className="h-1 w-1 rounded-full bg-primary/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
          <span className="h-2 w-2 rounded-full bg-primary shadow-glow" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
          <span className="h-1 w-1 rounded-full bg-primary/30" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id || t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="bg-background border border-border rounded-2xl p-7 md:p-8 relative hover:shadow-elevated hover:border-primary/20 transition-all duration-300 group overflow-hidden"
          >
            {/* Gradient quote mark */}
            <div className="absolute top-5 right-6 w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
              <Quote className="w-6 h-6 text-primary/30 group-hover:text-primary/50 transition-colors" />
            </div>

            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.rating || 5 }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>

            <p className="text-foreground mb-6 italic leading-relaxed text-sm md:text-base pr-14">"{t.content}"</p>

            <div className="flex items-center gap-3 pt-4 border-t border-border">
              {/* Avatar with initials */}
              <div className="w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center shrink-0 shadow-primary">
                <span className="text-sm font-bold text-primary-foreground">{getInitials(t.name)}</span>
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}{t.company ? `, ${t.company}` : ""}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};
