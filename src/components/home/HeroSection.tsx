import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => (
  <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-20 bg-gradient-to-br from-primary/[0.03] via-background to-background">
    {/* Subtle decorative shapes */}
    <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-3xl" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-3xl" />

    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/5 rounded-full border border-primary/10">
            Chasing Dreams
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground"
        >
          Empowering{" "}
          <span className="text-primary">Innovation</span>{" "}
          Across Industries
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed"
        >
          E-Learning · Healthcare · Hospitality · IT · Consulting · BPM — Claimed to be the World's First Organisation Focused on Employee Growth to the Fullest.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button size="lg" asChild>
            <Link to="/contact">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/services">Explore Services</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);
