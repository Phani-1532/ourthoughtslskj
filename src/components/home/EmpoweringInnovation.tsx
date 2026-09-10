import { SectionWrapper } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart, Users } from "lucide-react";

export const EmpoweringInnovation = () => (
  <SectionWrapper className="bg-muted/20 relative overflow-hidden">
    <div className="glow-orb w-[400px] h-[400px] bg-primary/5 top-[-10%] right-[-5%] animate-float-slow" />

    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="editorial-kicker mb-5">Empowering Innovation</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-5 tracking-tight text-balance">
          Transforming Dreams into Reality
        </h2>
        <p className="text-sm md:text-lg text-muted-foreground mb-6 leading-relaxed max-w-xl">
          At Our Thoughts LSKJ, we're dedicated to transforming dreams into reality. We empower aspiring entrepreneurs, especially women, by providing opportunities to pursue their passions and achieve their goals.
        </p>
        <p className="text-sm md:text-base text-muted-foreground mb-8 leading-relaxed max-w-xl">
          Join us, where your aspirations meet our unwavering support, and let's create something extraordinary together.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" className="group" asChild>
            <Link to="/about">
              Discover Our Style <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button variant="glass" size="lg" asChild>
            <Link to="/careers">Join Our Team</Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative"
      >
        <div className="relative rounded-3xl overflow-hidden border border-border shadow-elevated group">
          <img
            src="https://images.pexels.com/photos/8837438/pexels-photo-8837438.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Diverse group of businesswomen collaborating"
            loading="lazy"
            className="w-full h-[320px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Sparkles, title: "Dream Big", desc: "Turning ambitious ideas into real products." },
                { icon: Heart, title: "Women First", desc: "Opportunities for women entrepreneurs." },
                { icon: Users, title: "Together", desc: "Collaborative culture built on trust." },
                { icon: ArrowRight, title: "Achieve More", desc: "Measurable outcomes for everyone." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="bg-background/80 backdrop-blur-md border border-border/60 rounded-xl p-3 flex items-center gap-2.5 hover:border-primary/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </SectionWrapper>
);
