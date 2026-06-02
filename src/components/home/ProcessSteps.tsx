import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Search, Lightbulb, Code2, Rocket, LineChart } from "lucide-react";
import { useIndustry } from "@/contexts/IndustryContext";

const baseSteps = [
  { icon: Search, title: "Discover", desc: "Deep dive into your goals, users and constraints." },
  { icon: Lightbulb, title: "Design", desc: "Architecture, UX and a clear delivery roadmap." },
  { icon: Code2, title: "Build", desc: "Agile sprints with weekly demos and tight feedback loops." },
  { icon: Rocket, title: "Launch", desc: "Production rollout, training and zero-downtime handover." },
  { icon: LineChart, title: "Scale", desc: "Monitor, optimize and grow with continuous improvement." },
];

export const ProcessSteps = () => {
  const { industry } = useIndustry();
  return (
    <SectionWrapper className="bg-muted/30">
      <SectionHeader
        badge="How We Work"
        title="A Proven Delivery Process"
        subtitle={`From idea to impact — a battle-tested 5-step framework${industry !== "default" ? " tailored to your industry" : ""}.`}
      />
      <div className="relative grid grid-cols-1 md:grid-cols-5 gap-6">
        {baseSteps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="text-xs text-primary font-semibold mb-2">STEP {i + 1}</div>
            <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};
