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

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    supabase.from("testimonials").select("*").eq("published", true).then(({ data }) => {
      if (data && data.length > 0) setTestimonials(data);
    });
  }, []);

  return (
    <SectionWrapper className="bg-card/40">
      <div className="text-center mb-12 md:mb-16">
        <span className="editorial-kicker mb-5">
          Testimonials
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
          Voices That Drive Us Forward
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id || t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-background border border-border rounded-2xl p-7 md:p-8 relative hover:shadow-elevated hover:border-primary/20 transition-all duration-300"
          >
            <Quote className="w-10 h-10 text-primary/10 absolute top-6 right-6" />
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.rating || 5 }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground mb-6 italic leading-relaxed text-sm md:text-base">"{t.content}"</p>
            <div>
              <p className="font-semibold text-foreground text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}{t.company ? `, ${t.company}` : ""}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};
