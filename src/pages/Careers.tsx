import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  MapPin, Clock, Briefcase, ArrowRight, Heart, Users, Rocket, GraduationCap,
  Star, CheckCircle, Upload, Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const jobs = [
  { id: 1, title: "Senior React Developer", department: "Engineering", location: "Hyderabad / Remote", type: "Full-time", experience: "3-5 years" },
  { id: 2, title: "UI/UX Designer", department: "Design", location: "Hyderabad", type: "Full-time", experience: "2-4 years" },
  { id: 3, title: "Digital Marketing Manager", department: "Marketing", location: "Remote", type: "Full-time", experience: "3-5 years" },
  { id: 4, title: "Backend Developer (Python)", department: "Engineering", location: "Hyderabad / Remote", type: "Full-time", experience: "2-4 years" },
  { id: 5, title: "Healthcare Consultant", department: "Consulting", location: "Hyderabad", type: "Full-time", experience: "5+ years" },
  { id: 6, title: "Content Writer", department: "Marketing", location: "Remote", type: "Part-time", experience: "1-3 years" },
];

const culture = [
  { icon: Heart, title: "Employee-First", description: "We believe in growing people first, then the business follows." },
  { icon: Rocket, title: "Innovation Driven", description: "Experiment, fail fast, learn faster — we encourage bold ideas." },
  { icon: Users, title: "Diverse & Inclusive", description: "Empowering women entrepreneurs and building diverse teams." },
  { icon: GraduationCap, title: "Continuous Learning", description: "Free courses, certifications, and mentorship programs." },
];

const hiringSteps = [
  { step: 1, title: "Apply Online", description: "Submit your resume and portfolio." },
  { step: 2, title: "Screening Call", description: "15-minute chat with our HR team." },
  { step: 3, title: "Technical Round", description: "Skills assessment relevant to your role." },
  { step: 4, title: "Culture Fit", description: "Meet the team and see if we click." },
  { step: 5, title: "Offer", description: "Welcome aboard! Onboarding begins." },
];

const employeeTestimonials = [
  { name: "Ravi Kumar", role: "Full-Stack Developer", text: "The best part about working here is the freedom to innovate. Every idea is heard.", years: "2 years" },
  { name: "Ananya Sharma", role: "UX Designer", text: "I joined as a fresher and grew into a team lead. The mentorship here is unmatched.", years: "3 years" },
  { name: "Fatima Ali", role: "Marketing Lead", text: "As a woman in tech, I've never felt more supported and empowered.", years: "1.5 years" },
];

const cultureImages = [
  "https://images.pexels.com/photos/7794059/pexels-photo-7794059.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "https://images.pexels.com/photos/9034729/pexels-photo-9034729.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
];

const Careers = () => {
  const { toast } = useToast();
  const [appForm, setAppForm] = useState({ name: "", email: "", phone: "", resume: "", cover: "" });

  const handleApply = () => {
    toast({ title: "Application Submitted!", description: "We'll review your application and get back within 5 business days." });
    setAppForm({ name: "", email: "", phone: "", resume: "", cover: "" });
  };

  return (
    <Layout>
      <div className="pt-24">
        {/* Hero */}
        <SectionWrapper>
          <div className="text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-medium mb-6">We're Hiring</span>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">Build Your Career With <span className="text-gradient-gold">Purpose</span></h1>
              <p className="text-lg text-muted-foreground font-body mb-8">Join a team that's transforming industries and empowering dreams. We're not just building products — we're building futures.</p>
              <Button variant="hero" size="xl" onClick={() => document.getElementById("openings")?.scrollIntoView({ behavior: "smooth" })}>View Open Positions <ArrowRight className="w-5 h-5" /></Button>
            </motion.div>
          </div>
          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mt-10 rounded-3xl overflow-hidden border border-border shadow-elevated group"
          >
            <img
              src={cultureImages[0]}
              alt="Team collaboration"
              loading="lazy"
              className="w-full h-[260px] md:h-[340px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </SectionWrapper>

        {/* Culture */}
        <SectionWrapper>
          <SectionHeader badge="Culture" title="Why Work With Us" subtitle="We're building something different — a company where people come first." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {culture.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-gradient-card border-border/30 h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><c.icon className="w-7 h-7 text-primary" /></div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-2">{c.title}</h3>
                    <p className="text-sm text-muted-foreground font-body">{c.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* Hiring Process */}
        <SectionWrapper>
          <SectionHeader badge="Process" title="Our Hiring Process" subtitle="Transparent, fair, and fast — typically 2 weeks from application to offer." />
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {hiringSteps.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex-1">
                <div className="text-center p-6 rounded-xl bg-gradient-card border border-border/30">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary font-display font-bold">{s.step}</div>
                  <h4 className="font-display font-semibold text-foreground mb-1">{s.title}</h4>
                  <p className="text-xs text-muted-foreground font-body">{s.description}</p>
                </div>
                {i < hiringSteps.length - 1 && <div className="hidden md:block w-full h-0.5 bg-primary/20 mt-8" />}
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* Employee Testimonials */}
        <SectionWrapper>
          <SectionHeader badge="Team Voices" title="Hear From Our Team" subtitle="What it's really like to work at Our Thoughts LSKJ." />
          {/* Team image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-10 rounded-3xl overflow-hidden border border-border shadow-elevated group"
          >
            <img
              src={cultureImages[1]}
              alt="Team working together"
              loading="lazy"
              className="w-full h-[200px] md:h-[280px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {employeeTestimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-gradient-card border-border/30 h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">{Array(5).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 text-primary fill-primary" />)}</div>
                    <p className="text-sm text-muted-foreground font-body mb-4 italic">"{t.text}"</p>
                    <p className="text-foreground font-display font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground font-body">{t.role} · {t.years}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* Open Positions */}
        <SectionWrapper>
          <div id="openings" className="scroll-mt-24">
            <SectionHeader badge="Openings" title="Current Opportunities" subtitle="Find the role that fits your skills and ambitions." />
          </div>
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Card className="bg-gradient-card border-border/30 hover:border-primary/30 transition-all">
                  <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-display font-semibold text-foreground">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground font-body">
                        <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.department}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Apply Now <ArrowRight className="w-3 h-3" /></Button>
                      </DialogTrigger>
                      <DialogContent className="bg-card border-border/50 max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="font-display">Apply for {job.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <Input placeholder="Full Name *" value={appForm.name} onChange={e => setAppForm(p => ({ ...p, name: e.target.value }))} className="bg-secondary/50 border-border/50" />
                          <Input placeholder="Email *" type="email" value={appForm.email} onChange={e => setAppForm(p => ({ ...p, email: e.target.value }))} className="bg-secondary/50 border-border/50" />
                          <Input placeholder="Phone" value={appForm.phone} onChange={e => setAppForm(p => ({ ...p, phone: e.target.value }))} className="bg-secondary/50 border-border/50" />
                          <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground font-body">Upload Resume (PDF, DOC)</p>
                            <input type="file" className="mt-2 text-sm text-muted-foreground" accept=".pdf,.doc,.docx" />
                          </div>
                          <Textarea placeholder="Cover Letter (optional)" value={appForm.cover} onChange={e => setAppForm(p => ({ ...p, cover: e.target.value }))} rows={3} className="bg-secondary/50 border-border/50" />
                          <Button variant="hero" className="w-full" onClick={handleApply}><Send className="w-4 h-4 mr-2" />Submit Application</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </Layout>
  );
};

export default Careers;
