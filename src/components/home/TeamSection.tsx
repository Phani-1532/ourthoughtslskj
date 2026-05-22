import { SectionWrapper } from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";

const team = [
  { name: "Lakshya Sharma", role: "Founder & CEO", initials: "LS", gradient: "from-primary to-secondary" },
  { name: "Kavya Joshi", role: "Head of Product", initials: "KJ", gradient: "from-secondary to-accent" },
  { name: "Siddharth Rao", role: "Engineering Lead", initials: "SR", gradient: "from-accent to-primary" },
  { name: "Jaya Mehta", role: "Design Director", initials: "JM", gradient: "from-primary to-accent" },
];

export const TeamSection = () => (
  <SectionWrapper className="py-16">
    <div className="text-center mb-12">
      <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Our Team</p>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">The people behind the work</h2>
      <p className="text-muted-foreground mt-3 max-w-xl mx-auto">A multidisciplinary team building products that move industries forward.</p>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {team.map((m, i) => (
        <motion.div
          key={m.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="group rounded-2xl border border-border/60 bg-card/40 p-6 text-center hover:border-primary/40 transition-all hover:-translate-y-1"
        >
          <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${m.gradient} flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-elevated`}>
            {m.initials}
          </div>
          <h3 className="mt-4 font-semibold text-foreground">{m.name}</h3>
          <p className="text-sm text-muted-foreground">{m.role}</p>
          <div className="flex justify-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary"><Linkedin className="w-4 h-4" /></a>
            <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter className="w-4 h-4" /></a>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);
