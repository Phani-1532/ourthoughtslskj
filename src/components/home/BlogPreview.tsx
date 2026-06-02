import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useIndustry } from "@/contexts/IndustryContext";

type Post = { title: string; excerpt: string; tag: string; readTime: string; date: string };

const postsByIndustry: Record<string, Post[]> = {
  default: [
    { title: "How Multi-Domain Innovation Drives 10x Growth", excerpt: "Why cross-industry expertise creates compounding advantages.", tag: "Insights", readTime: "5 min read", date: "Jun 2026" },
    { title: "The 2026 Digital Transformation Playbook", excerpt: "A practical guide for leaders modernizing their stack.", tag: "Strategy", readTime: "7 min read", date: "May 2026" },
    { title: "AI in the Enterprise: From POC to Production", excerpt: "What actually works when scaling AI initiatives.", tag: "AI", readTime: "6 min read", date: "May 2026" },
  ],
  elearning: [
    { title: "The Future of AI-Powered Personalized Learning", excerpt: "Adaptive paths that boost completion by 40%.", tag: "EdTech", readTime: "6 min read", date: "Jun 2026" },
    { title: "Live Classes vs. Self-Paced: Which Wins?", excerpt: "Engagement data from 100k+ learners.", tag: "Learning", readTime: "4 min read", date: "May 2026" },
    { title: "Building a Modern LMS from Scratch", excerpt: "Architecture patterns we ship in production.", tag: "Engineering", readTime: "8 min read", date: "May 2026" },
  ],
  healthcare: [
    { title: "HIPAA-Ready Telemedicine in 2026", excerpt: "Compliance patterns for modern care delivery.", tag: "Health", readTime: "6 min read", date: "Jun 2026" },
    { title: "Smart Hospital Operations with AI", excerpt: "Cutting OPD wait times with intelligent triage.", tag: "Operations", readTime: "5 min read", date: "May 2026" },
    { title: "Interoperability: FHIR, HL7 & the Real World", excerpt: "How to actually integrate clinical systems.", tag: "Integration", readTime: "7 min read", date: "May 2026" },
  ],
  hospitality: [
    { title: "The Modern Guest Journey, Mapped", excerpt: "9 touchpoints that drive repeat bookings.", tag: "Guest XP", readTime: "5 min read", date: "Jun 2026" },
    { title: "PMS + POS: One Stack to Run Properties", excerpt: "Why unified operations beat best-of-breed.", tag: "Operations", readTime: "6 min read", date: "May 2026" },
    { title: "Loyalty Programs that Actually Work", excerpt: "Behavioral design lessons from top hotels.", tag: "Growth", readTime: "4 min read", date: "May 2026" },
  ],
  it: [
    { title: "Kubernetes at Enterprise Scale: Lessons Learned", excerpt: "Patterns from 50+ production clusters.", tag: "DevOps", readTime: "8 min read", date: "Jun 2026" },
    { title: "Choosing the Right Cloud: AWS vs Azure vs GCP", excerpt: "A decision framework that survives the hype.", tag: "Cloud", readTime: "7 min read", date: "May 2026" },
    { title: "MLOps in 2026: The Stack That Ships", excerpt: "From notebooks to reliable model serving.", tag: "AI/ML", readTime: "6 min read", date: "May 2026" },
  ],
  consulting: [
    { title: "From Strategy Deck to Real Outcomes", excerpt: "Why execution accountability changes everything.", tag: "Strategy", readTime: "5 min read", date: "Jun 2026" },
    { title: "Operating Model Redesign: A 90-Day Playbook", excerpt: "How leading firms ship transformation fast.", tag: "Operations", readTime: "7 min read", date: "May 2026" },
    { title: "KPIs That Actually Predict Growth", excerpt: "Stop tracking vanity metrics.", tag: "Analytics", readTime: "4 min read", date: "May 2026" },
  ],
  bpm: [
    { title: "RPA in 2026: Where Bots Actually Pay Off", excerpt: "5 back-office processes ripe for automation.", tag: "Automation", readTime: "6 min read", date: "Jun 2026" },
    { title: "Process Mining: See Bottlenecks Before They Bite", excerpt: "Turn event logs into continuous improvement.", tag: "Analytics", readTime: "5 min read", date: "May 2026" },
    { title: "Workflow Engines: Build vs Buy", excerpt: "A pragmatic decision framework.", tag: "Architecture", readTime: "7 min read", date: "May 2026" },
  ],
};

export const BlogPreview = () => {
  const { industry } = useIndustry();
  const posts = postsByIndustry[industry] || postsByIndustry.default;
  return (
    <SectionWrapper>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
        <div>
          <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/5 rounded-full border border-primary/10">
            Insights & Blog
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">Latest from Our Team</h2>
        </div>
        <Button variant="outline" asChild>
          <Link to="/blog">View All Articles <ArrowRight className="w-4 h-4" /></Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4 text-xs">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">{p.tag}</span>
              <span className="text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{p.readTime}</span>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition">{p.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{p.excerpt}</p>
            <div className="text-xs text-muted-foreground">{p.date}</div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
};
