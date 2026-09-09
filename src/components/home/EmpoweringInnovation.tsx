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
        className="grid grid-cols-2 gap-4"
      >
        {[
          { icon: Sparkles, title: "Dream Big", desc: "We turn ambitious ideas into real products." },
          { icon: Heart, title: "Women Empowerment", desc: "Creating opportunities for women entrepreneurs." },
          { icon: Users, title: "Work Together", desc: "Collaborative culture built on trust." },
          { icon: ArrowRight, title: "Achieve More", desc: "Measurable outcomes for every stakeholder." },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className="gradient-border bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-elevated transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
              <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </SectionWrapper>
);
