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
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Full background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id + "-bg"}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image_url || "/hero-innovation.jpg"}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content overlay */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            {slide.badge && (
              <span className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground bg-primary/80 rounded-full backdrop-blur-sm">
                {slide.badge}
              </span>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-background">
              {titleParts[0]}
              {slide.highlight && <span className="text-primary">{slide.highlight}</span>}
              {titleParts[1] || ""}
            </h1>

            <p className="text-base md:text-lg text-background/80 mb-8 max-w-xl leading-relaxed">
              {slide.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="shadow-gold" asChild>
                <Link to={slide.cta_link || "/contact"}>
                  {slide.cta_text || "Get Started"} <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-background/30 text-background hover:bg-background/10" asChild>
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="flex items-center gap-4 mt-12 md:mt-16">
          <button onClick={() => setCurrent(p => (p - 1 + slides.length) % slides.length)} className="w-10 h-10 rounded-full border border-background/30 flex items-center justify-center text-background/70 hover:text-background hover:border-background transition-colors backdrop-blur-sm">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-10 bg-primary" : "w-2 bg-background/40 hover:bg-background/60"}`}
              />
            ))}
          </div>
          <button onClick={() => setCurrent(p => (p + 1) % slides.length)} className="w-10 h-10 rounded-full border border-background/30 flex items-center justify-center text-background/70 hover:text-background hover:border-background transition-colors backdrop-blur-sm">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
