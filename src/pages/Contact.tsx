import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, CheckCircle, Mail, Phone, MapPin, MessageCircle,
  User, Building2, Briefcase, Send,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const steps = ["Your Info", "Company", "Requirements", "Confirm"];

const Contact = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", role: "", industry: "", budget: "", timeline: "", message: "",
  });

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = () => {
    setSubmitted(true);
    toast({ title: "Thank you!", description: "We'll get back to you within 24 hours." });
  };

  const canNext = () => {
    if (step === 0) return form.name && form.email;
    if (step === 1) return form.company;
    return true;
  };

  if (submitted) {
    return (
      <Layout>
        <div className="pt-24 min-h-[60vh] flex items-center justify-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">We've Received Your Inquiry</h2>
            <p className="text-muted-foreground font-body mb-8">Our team will reach out within 24 hours. Check your email for a confirmation.</p>
            <Button onClick={() => { setSubmitted(false); setStep(0); setForm({ name: "", email: "", phone: "", company: "", role: "", industry: "", budget: "", timeline: "", message: "" }); }}>Submit Another</Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-24">
        <SectionWrapper>
          <SectionHeader badge="Contact" title="Let's Build Something Great" subtitle="Tell us about your project. We'll respond within 24 hours." />

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "info@ourthoughtslskj.com" },
                { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                { icon: MapPin, label: "Office", value: "Hyderabad, India" },
                { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/919876543210" },
              ].map((c) => (
                <Card key={c.label} className="bg-gradient-card border-border/30">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><c.icon className="w-5 h-5 text-primary" /></div>
                    <div>
                      <p className="text-xs text-muted-foreground font-body">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-body font-medium">{c.value}</a>
                      ) : (
                        <p className="text-sm text-foreground font-body font-medium">{c.value}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Multi-step Form */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-card border-border/30">
                <CardContent className="p-8">
                  {/* Progress */}
                  <div className="flex items-center justify-between mb-8">
                    {steps.map((s, i) => (
                      <div key={s} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-medium transition-colors ${
                          i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                        }`}>{i + 1}</div>
                        <span className="hidden sm:block text-xs font-body text-muted-foreground ml-2">{s}</span>
                        {i < steps.length - 1 && <div className={`w-8 sm:w-16 h-0.5 mx-2 ${i < step ? "bg-primary" : "bg-secondary"}`} />}
                      </div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                      {step === 0 && (
                        <div className="space-y-4">
                          <h3 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2"><User className="w-5 h-5 text-primary" />Your Information</h3>
                          <Input placeholder="Full Name *" value={form.name} onChange={e => update("name", e.target.value)} className="bg-secondary/50 border-border/50" />
                          <Input placeholder="Email Address *" type="email" value={form.email} onChange={e => update("email", e.target.value)} className="bg-secondary/50 border-border/50" />
                          <Input placeholder="Phone Number" value={form.phone} onChange={e => update("phone", e.target.value)} className="bg-secondary/50 border-border/50" />
                        </div>
                      )}
                      {step === 1 && (
                        <div className="space-y-4">
                          <h3 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2"><Building2 className="w-5 h-5 text-primary" />Company Details</h3>
                          <Input placeholder="Company Name *" value={form.company} onChange={e => update("company", e.target.value)} className="bg-secondary/50 border-border/50" />
                          <Input placeholder="Your Role" value={form.role} onChange={e => update("role", e.target.value)} className="bg-secondary/50 border-border/50" />
                          <select value={form.industry} onChange={e => update("industry", e.target.value)} className="w-full h-10 rounded-md border border-border/50 bg-secondary/50 px-3 text-sm text-foreground font-body">
                            <option value="">Select Industry</option>
                            {["Healthcare", "E-Commerce", "Hospitality", "IT & Technology", "HR & Finance", "Food Services", "Law", "Education", "Other"].map(i => <option key={i} value={i}>{i}</option>)}
                          </select>
                        </div>
                      )}
                      {step === 2 && (
                        <div className="space-y-4">
                          <h3 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" />Project Requirements</h3>
                          <select value={form.budget} onChange={e => update("budget", e.target.value)} className="w-full h-10 rounded-md border border-border/50 bg-secondary/50 px-3 text-sm text-foreground font-body">
                            <option value="">Estimated Budget</option>
                            {["Under ₹5L", "₹5L - ₹15L", "₹15L - ₹50L", "₹50L+", "Not Sure"].map(b => <option key={b} value={b}>{b}</option>)}
                          </select>
                          <select value={form.timeline} onChange={e => update("timeline", e.target.value)} className="w-full h-10 rounded-md border border-border/50 bg-secondary/50 px-3 text-sm text-foreground font-body">
                            <option value="">Expected Timeline</option>
                            {["1-2 Months", "3-4 Months", "5-6 Months", "6+ Months", "Flexible"].map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <Textarea placeholder="Tell us about your project..." value={form.message} onChange={e => update("message", e.target.value)} rows={4} className="bg-secondary/50 border-border/50" />
                        </div>
                      )}
                      {step === 3 && (
                        <div className="space-y-4">
                          <h3 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2"><Send className="w-5 h-5 text-primary" />Review & Submit</h3>
                          <div className="bg-secondary/30 rounded-xl p-6 space-y-3">
                            {[
                              { l: "Name", v: form.name }, { l: "Email", v: form.email }, { l: "Phone", v: form.phone },
                              { l: "Company", v: form.company }, { l: "Role", v: form.role }, { l: "Industry", v: form.industry },
                              { l: "Budget", v: form.budget }, { l: "Timeline", v: form.timeline },
                            ].filter(x => x.v).map(x => (
                              <div key={x.l} className="flex justify-between text-sm font-body">
                                <span className="text-muted-foreground">{x.l}</span>
                                <span className="text-foreground">{x.v}</span>
                              </div>
                            ))}
                            {form.message && <div className="pt-3 border-t border-border/30"><p className="text-sm text-muted-foreground font-body">Message:</p><p className="text-sm text-foreground font-body mt-1">{form.message}</p></div>}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-between mt-8">
                    <Button variant="ghost" onClick={() => setStep(s => s - 1)} disabled={step === 0}><ArrowLeft className="w-4 h-4 mr-1" />Back</Button>
                    {step < 3 ? (
                      <Button variant="hero" onClick={() => setStep(s => s + 1)} disabled={!canNext()}>Next <ArrowRight className="w-4 h-4" /></Button>
                    ) : (
                      <Button variant="hero" onClick={handleSubmit}>Submit Inquiry <Send className="w-4 h-4" /></Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </Layout>
  );
};

export default Contact;
