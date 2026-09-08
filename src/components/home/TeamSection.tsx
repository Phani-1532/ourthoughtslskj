import { SectionWrapper } from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";

const team = [
  { name: "Lakshya Sharma", role: "Founder & CEO", initials: "LS", gradient: "from-primary to-primary/60" },
  { name: "Kavya Joshi", role: "Head of Product", initials: "KJ", gradient: "from-primary/70 to-primary/40" },
  { name: "Siddharth Rao", role: "Engineering Lead", initials: "SR", gradient: "from-primary/50 to-primary/80" },
  { name: "Jaya Mehta", role: "Design Director", initials: "JM", gradient: "from-primary/80 to-primary/50" },
];

export const TeamSection = () => (
  <SectionWrapper className="py-16">
    <div className="text-center mb-12">
      <span className="editorial-kicker mb-5">Our Team</span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mt-2 tracking-tight">The people behind the work</h2>
      <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm md:text-base">A multidisciplinary team building products that move industries forward.</p>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {team.map((m, i) => (
        <motion.div
          key={m.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="group rounded-2xl border border-border/60 bg-card/40 p-6 text-center hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
        >
          <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${m.gradient} flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-primary`}>
            {m.initials}
          </div>
          <h3 className="mt-4 font-semibold text-foreground">{m.name}</h3>
          <p className="text-sm text-muted-foreground">{m.role}</p>
          <div className="flex justify-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-4 h-4" /></a>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);
