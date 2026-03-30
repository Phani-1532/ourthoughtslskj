import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
    {/* Background */}
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
    </div>

    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 rounded-full border border-primary/20 font-body">
            <Sparkles className="w-3 h-3" /> Chasing Dreams
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6"
        >
          Empowering{" "}
          <span className="text-gradient-gold">Innovation</span>{" "}
          Across Industries
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground font-body mb-8 max-w-2xl"
        >
          E-Learning · Healthcare · Hospitality · IT · Consulting · BPM — Claimed to be the World's First Organisation Focused on Employee Growth to the Fullest.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">
              Book a Demo <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button variant="outline" size="xl" asChild>
            <Link to="/services">Explore Services</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);
