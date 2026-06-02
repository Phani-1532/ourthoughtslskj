import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Play } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export const VideoSection = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <SectionWrapper className="bg-muted/30">
      <SectionHeader
        badge="See Us in Action"
        title="2 Minutes to Understand What We Do"
        subtitle="A quick tour of our work, our process and the outcomes we deliver."
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-border shadow-xl aspect-video bg-primary relative"
      >
        {playing ? (
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="Our Thoughts LSKJ"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary via-primary to-primary/70 flex items-center justify-center group"
            aria-label="Play video"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(var(--primary-foreground)/0.15),_transparent_60%)]" />
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary-foreground flex items-center justify-center group-hover:scale-110 transition shadow-2xl">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-primary fill-primary ml-1" />
            </div>
          </button>
        )}
      </motion.div>
    </SectionWrapper>
  );
};
