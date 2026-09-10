import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Heart, Utensils, BarChart3, Building2, GraduationCap } from "lucide-react";

const upcomingApps = [
  {
    title: "HR & Finance Intelligence Hub",
    description: "Smart HR and financial management with AI-driven insights, payroll automation, and workforce analytics.",
    icon: BarChart3,
    status: "Coming Soon",
    color: "bg-cyan-500/10 text-cyan-400",
    glow: "bg-cyan-500/8",
    image: "https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    title: "Company Profile Platform",
    description: "A comprehensive platform showcasing company profiles with dynamic content and brand storytelling.",
    icon: Briefcase,
    status: "Coming Soon",
    color: "bg-blue-500/10 text-blue-400",
    glow: "bg-blue-500/8",
    image: "https://images.pexels.com/photos/7869057/pexels-photo-7869057.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    title: "Learning Across Sectors",
    description: "Cross-industry learning platform connecting skills, courses, and real-world experience across all domains.",
    icon: GraduationCap,
    status: "Coming Soon",
    color: "bg-emerald-500/10 text-emerald-400",
    glow: "bg-emerald-500/8",
    image: "https://images.pexels.com/photos/5905749/pexels-photo-5905749.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    title: "Modern Food App",
    description: "Connects home cooks to local communities, bringing homemade items to wider audiences.",
    icon: Utensils,
    status: "Coming Soon",
    color: "bg-amber-500/10 text-amber-400",
    glow: "bg-amber-500/8",
    image: "https://images.pexels.com/photos/16052344/pexels-photo-16052344.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    title: "Healthcare Management Suite",
    description: "End-to-end hospital management including pharmacy, patient care, and facility operations.",
    icon: Heart,
    status: "Coming Soon",
    color: "bg-red-500/10 text-red-400",
    glow: "bg-red-500/8",
    image: "https://images.pexels.com/photos/5407260/pexels-photo-5407260.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    title: "Vendor Management System",
    description: "Cost control and risk-minimized vendor management with automated procurement workflows.",
    icon: Building2,
    status: "Coming Soon",
    color: "bg-violet-500/10 text-violet-400",
    glow: "bg-violet-500/8",
    image: "https://images.pexels.com/photos/4487365/pexels-photo-4487365.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
];

export const UpcomingApps = () => (
  <SectionWrapper className="bg-card/40 relative overflow-hidden">
    <SectionHeader
      badge="Applications on the Way"
      title="What's Coming Next"
      subtitle="We're building the next generation of intelligent platforms across multiple domains."
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {upcomingApps.map((app, i) => (
        <motion.div
          key={app.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
        >
          <div className="gradient-border relative rounded-2xl border border-border bg-card h-full overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elevated group">
            {/* Image header */}
            <div className="relative h-40 overflow-hidden bg-gradient-to-br from-muted/20 to-background">
              <img
                src={app.image}
                alt={app.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <div className={`absolute top-3 right-3 w-10 h-10 rounded-xl ${app.color} flex items-center justify-center backdrop-blur-sm border border-white/10`}>
                <app.icon className="w-5 h-5" />
              </div>
              <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 backdrop-blur-sm">
                {app.status}
              </span>
            </div>
            {/* Content */}
            <div className="p-5 relative">
              <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full ${app.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none`} />
              <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors relative">{app.title}</h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed relative">{app.description}</p>
              <span className="text-xs text-primary font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 group-hover:gap-2 transition-all relative">
                Learn more <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);
