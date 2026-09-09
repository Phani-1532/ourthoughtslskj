import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Search, Lightbulb, Code2, Rocket, LineChart, FileText } from "lucide-react";
import { useIndustry } from "@/contexts/IndustryContext";

const steps = [
  {
    icon: Search,
    title: "Discover",
    desc: "Kickoff workshop to align on goals, users and constraints.",
    deliverable: "Requirements doc + success metrics",
    duration: "Week 1",
  },
  {
    icon: Lightbulb,
    title: "Design",
    desc: "Information architecture, UX flows and visual system.",
    deliverable: "Clickable Figma prototype + tech blueprint",
    duration: "Week 2–3",
  },
  {
    icon: Code2,
    title: "Build",
    desc: "Agile sprints with weekly demos and tight feedback loops.",
    deliverable: "Staging build + sprint review every Friday",
    duration: "Week 4–10",
  },
  {
    icon: FileText,
    title: "Test & Harden",
    desc: "QA, security review, load testing and accessibility audit.",
    deliverable: "Test report + UAT sign-off",
    duration: "Week 11",
  },
  {
    icon: Rocket,
    title: "Launch",
    desc: "Production rollout, training and zero-downtime handover.",
    deliverable: "Live release + runbook + team training",
    duration: "Week 12",
  },
  {
    icon: LineChart,
    title: "Scale & Support",
    desc: "Monitor, optimize and grow with continuous improvement.",
    deliverable: "Monthly insights report + SLA-backed support",
    duration: "Ongoing",
  },
];

export const ProcessSteps = () => {
  const { industry } = useIndustry();
  return (
    <SectionWrapper className="bg-muted/20">
      <SectionHeader
        badge="How We Work"
        title="A Proven Delivery Process"
        subtitle={`From idea to impact — our 6-stage framework with clear deliverables at every step${
          industry !== "default" ? ", tailored to your industry" : ""
        }.`}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="gradient-border bg-card rounded-2xl p-6 border border-border hover:border-primary/40 hover:shadow-elevated transition-all duration-300 group overflow-hidden relative"
          >
            {/* Step number watermark */}
            <span className="absolute top-2 right-4 text-5xl font-extrabold text-foreground/[0.03] group-hover:text-primary/10 transition-colors duration-500 select-none">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                  <s.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border">
                  {s.duration}
                </span>
              </div>
              <div className="text-xs text-primary font-semibold mb-2 tracking-wider">STEP {i + 1}</div>
              <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.desc}</p>
              <div className="pt-4 border-t border-border">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Deliverable
                </div>
                <div className="text-xs text-foreground font-medium">{s.deliverable}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};
