import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Slide {
  id: string;
  title: string;
  highlight: string | null;
  subtitle: string | null;
  cta_text: string | null;
  cta_link: string | null;
  badge: string | null;
  image_url: string | null;
}

const fallbackSlides: Slide[] = [
  { id: "1", title: "Empowering Innovation Across Industries", highlight: "Innovation", subtitle: "E-Learning · Healthcare · Hospitality · IT · Consulting · BPM — World's First Organisation Focused on Employee Growth.", cta_text: "Get Started", cta_link: "/contact", badge: "Chasing Dreams", image_url: "/hero-innovation.jpg" },
  { id: "2", title: "Building the Future of Digital Healthcare", highlight: "Healthcare", subtitle: "AI-powered solutions, telemedicine platforms, and smart hospital management systems.", cta_text: "Explore Healthcare", cta_link: "/industries/healthcare", badge: "Healthcare Innovation", image_url: "/hero-healthcare.jpg" },
  { id: "3", title: "Next-Gen E-Learning Experiences", highlight: "E-Learning", subtitle: "Interactive courses, live classes, and AI-powered learning paths for every student.", cta_text: "Discover E-Learning", cta_link: "/e-learning", badge: "EdTech Revolution", image_url: "/hero-elearning.jpg" },
];

export const HeroSection = () => {
  const [slides, setSlides] = useState<Slide[]>(fallbackSlides);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    supabase.from("hero_slides").select("*").eq("published", true).order("sort_order")
      .then(({ data }) => { if (data && data.length > 0) setSlides(data as Slide[]); });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current];
  const titleParts = slide.highlight
    ? slide.title.split(slide.highlight)
    : [slide.title];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 bg-gradient-to-br from-primary/[0.03] via-background to-background">
      {/* Subtle background shapes */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-3xl" />
      <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              {slide.badge && (
                <span className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/5 rounded-full border border-primary/10">
                  {slide.badge}
                </span>
              )}

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-bold leading-[1.15] mb-6 text-foreground">
                {titleParts[0]}
                {slide.highlight && <span className="text-primary">{slide.highlight}</span>}
                {titleParts[1] || ""}
              </h1>

              <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                {slide.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="shadow-gold" asChild>
                  <Link to={slide.cta_link || "/contact"}>
                    {slide.cta_text || "Get Started"} <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/services">Explore Services</Link>
                </Button>
              </div>

              {/* Slide indicators */}
              <div className="flex items-center gap-4 mt-10">
                <button onClick={() => setCurrent(p => (p - 1 + slides.length) % slides.length)} className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"}`}
                    />
                  ))}
                </div>
                <button onClick={() => setCurrent(p => (p + 1) % slides.length)} className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right: Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + "-img"}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative w-full max-w-lg lg:max-w-none">
                <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl scale-95" />
                <img
                  src={slide.image_url || "/hero-innovation.jpg"}
                  alt={slide.title}
                  width={960}
                  height={720}
                  className="relative rounded-2xl shadow-elevated w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
