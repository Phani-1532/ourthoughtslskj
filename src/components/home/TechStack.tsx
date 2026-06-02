import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Code2, Cloud, Database, Brain, Smartphone, Shield } from "lucide-react";

const stack = [
  { icon: Code2, title: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { icon: Database, title: "Backend", items: ["Node.js", "Python", "PostgreSQL", "MongoDB"] },
  { icon: Cloud, title: "Cloud & DevOps", items: ["AWS", "Azure", "Kubernetes", "Terraform"] },
  { icon: Brain, title: "AI / ML", items: ["OpenAI", "LangChain", "TensorFlow", "Vector DBs"] },
  { icon: Smartphone, title: "Mobile", items: ["React Native", "Flutter", "iOS", "Android"] },
  { icon: Shield, title: "Security", items: ["OAuth 2.0", "SOC 2", "HIPAA", "ISO 27001"] },
];

export const TechStack = () => (
  <SectionWrapper>
    <SectionHeader
      badge="Technology Stack"
      title="Modern, Battle-Tested, Production-Ready"
      subtitle="We pick the right tool for the job — not the trendiest one."
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stack.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <s.icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-3">{s.title}</h3>
          <div className="flex flex-wrap gap-2">
            {s.items.map((it) => (
              <span key={it} className="text-xs px-3 py-1 rounded-full bg-muted text-foreground border border-border">
                {it}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);
