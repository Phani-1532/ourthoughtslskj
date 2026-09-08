import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useIndustry } from "@/contexts/IndustryContext";
import { getIndustryContent } from "@/lib/industryContent";

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
  const { industry } = useIndustry();
  const industryContent = getIndustryContent(industry);
  const [dbSlides, setDbSlides] = useState<Slide[]>(fallbackSlides);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    supabase.from("hero_slides").select("*").eq("published", true).order("sort_order")
      .then(({ data }) => { if (data && data.length > 0) setDbSlides(data as Slide[]); });
  }, []);

  const slides: Slide[] = industryContent ? (industryContent.hero as Slide[]) : dbSlides;

  useEffect(() => { setCurrent(0); }, [industry]);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current];
  const titleParts = slide.highlight
    ? slide.title.split(slide.highlight)
    : [slide.title];

  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id + "-bg"}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slide.image_url || "/hero-innovation.jpg"}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            {slide.badge && (
              <motion.span
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 mb-7 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground bg-primary rounded-full shadow-primary"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/80 animate-pulse" />
                {slide.badge}
              </motion.span>
            )}

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-7 text-foreground tracking-tight">
              {titleParts[0]}
              {slide.highlight && <span className="text-gradient-primary">{slide.highlight}</span>}
              {titleParts[1] || ""}
            </h1>

            <p className="text-base md:text-lg text-foreground/70 mb-10 max-w-xl leading-relaxed">
              {slide.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="shadow-primary" asChild>
                <Link to={slide.cta_link || "/contact"}>
                  {slide.cta_text || "Get Started"} <ArrowRight className="w-4 h-4 ml-0.5" />
                </Link>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-4 mt-14 md:mt-20">
          <button
            onClick={() => setCurrent(p => (p - 1 + slides.length) % slides.length)}
            className="w-11 h-11 rounded-full border border-border bg-background/40 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-200 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-12 bg-primary"
                    : "w-2.5 bg-foreground/25 hover:bg-foreground/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrent(p => (p + 1) % slides.length)}
            className="w-11 h-11 rounded-full border border-border bg-background/40 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-200 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
